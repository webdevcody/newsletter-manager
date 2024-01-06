import { exec } from "child_process";
import { mkdirSync, readdirSync, readFileSync, rmSync } from "fs";
import fsExtra from "fs-extra";
import {
  env,
  getSubscriptionByEmailFactory,
  saveSubscriptionFactory,
  sendEmailFactory,
  subscribeUseCase,
  TSesConfig,
} from "@wdc-newsletter/business";
import { expect, describe, it } from "@jest/globals";
import { TDynamoConfig } from "@wdc-newsletter/business/src/persistence/dynamo";

const OUTPUT_EMAIL_FILE_PATH = "../output";

const dynamoConfig: TDynamoConfig = {
  region: env.REGION,
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_KEY,
  endpoint: env.DYNAMO_ENDPOINT,
};

console.log(dynamoConfig);

/**
 * This integration test expects the docker-compose to be up.
 */
describe("sendEmails command line tool", () => {
  beforeEach(() => {
    jest.setTimeout(30000);
  });

  it("should send out emails to the expected subscribed emails in our database", async () => {
    fsExtra.emptyDirSync(OUTPUT_EMAIL_FILE_PATH);

    const subscriberEmails = ["webdevcody@gmail.com", "bob@example.com"];

    console.log("a");
    for (const email of subscriberEmails) {
      console.log("b");

      await subscribeUseCase(
        {
          getSubscriptionByEmail: getSubscriptionByEmailFactory(dynamoConfig),
          saveSubscription: saveSubscriptionFactory(dynamoConfig),
        },
        email
      );
    }

    console.log("d");
    await new Promise<void>((resolve, reject) =>
      exec(
        'npx tsx ./src/sendEmailsCli.ts "welcome to the jungle" "../data/emails/welcome.mjml"',
        (err, stdout) => {
          console.log(stdout);
          if (err) reject(err);
          resolve();
        }
      )
    );
    console.log("e");

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
