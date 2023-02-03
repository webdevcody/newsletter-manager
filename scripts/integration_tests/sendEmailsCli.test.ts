import { exec } from "child_process";
import { mkdirSync, readdirSync, readFileSync, rmSync } from "fs";
import {
  getSubscriptionByEmailFactory,
  saveSubscriptionFactory,
  subscribeUseCase,
} from "@wdc-newsletter/business";
import { expect, describe, it } from "@jest/globals";
import { TDynamoConfig } from "@wdc-newsletter/business/src/persistence/dynamo";

const OUTPUT_EMAIL_FILE_PATH = "../output";

const dynamoConfig: TDynamoConfig = {
  region: "us-east-1",
  accessKeyId: "local",
  secretAccessKey: "local",
  endpoint: "http://localhost:8000",
};

/**
 * This integration test expects the docker-compose to be up.
 */
describe("sendEmails command line tool", () => {
  it("should send out emails to the expected subscribed emails in our database", async () => {
    rmSync(OUTPUT_EMAIL_FILE_PATH, { recursive: true, force: true });
    mkdirSync(OUTPUT_EMAIL_FILE_PATH);

    const subscriberEmails = ["webdevcody@gmail.com", "bob@example.com"];

    for (const email of subscriberEmails) {
      await subscribeUseCase(
        {
          getSubscriptionByEmail: getSubscriptionByEmailFactory(dynamoConfig),
          saveSubscription: saveSubscriptionFactory(dynamoConfig),
        },
        email
      );
    }

    await new Promise<void>((resolve, reject) =>
      exec(
        'ts-node ./src/sendEmailsCli.ts "welcome to the jungle" "../data/emails/welcome.mjml"',
        (err, stdout) => {
          if (err) reject(err);
          resolve();
        }
      )
    );

    const [dir] = readdirSync(OUTPUT_EMAIL_FILE_PATH);
    if (!dir) throw new Error("no emails sent");
    const emailDirectory = readdirSync(`${OUTPUT_EMAIL_FILE_PATH}/${dir}`);
    expect(emailDirectory.length).toEqual(2);

    const allHeadersContent = emailDirectory.map((directory) =>
      readFileSync(
        `${OUTPUT_EMAIL_FILE_PATH}/${dir}/${directory}/headers.txt`,
        "utf-8"
      )
    );

    subscriberEmails.forEach((email) => {
      expect(
        allHeadersContent.some((content) =>
          content.includes(`To Address: ${email}\n`)
        )
      ).toBe(true);
    });
  });
});
