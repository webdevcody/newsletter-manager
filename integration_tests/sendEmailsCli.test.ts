import { config } from "dotenv";
config();
import { exec } from "child_process";
import { mkdirSync, readdirSync, readFileSync, rmSync } from "fs";
import { subscribeUseCase } from "../src/server/api/useCases/subscribeUseCase";
import { expect, describe, it } from "@jest/globals";

/**
 * this test expects the entire local app to be running
 */
describe("sendEmails command line tool", () => {
  it("should send out emails to the expected subscribed emails in our database", async () => {
    rmSync("./output", { recursive: true, force: true });
    mkdirSync("./output");

    const subscriberEmails = ["webdevcody@gmail.com", "bob@example.com"];

    for (const email of subscriberEmails) {
      await subscribeUseCase(email);
    }

    await new Promise<void>((resolve, reject) =>
      exec(
        'ts-node ./src/scripts/sendEmailsCli.ts "welcome to the jungle" "./src/data/emails/welcome.mjml"',
        (err) => {
          if (err) reject(err);
          resolve();
        }
      )
    );

    const [dir] = readdirSync("./output");
    if (!dir) throw new Error("no emails sent");
    const emailDirectory = readdirSync(`./output/${dir}`);
    expect(emailDirectory.length).toEqual(2);

    const allHeadersContent = emailDirectory.map((directory) =>
      readFileSync(`./output/${dir}/${directory}/headers.txt`, "utf-8")
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
