import { config } from "dotenv";
config();
import { exec } from "child_process";
import { mkdirSync, readdirSync, rmSync } from "fs";
import { subscribeUseCase } from "../src/server/api/useCases/subscribeUseCase";

/**
 * this test expects the entire local app to be running
 */
describe("sendEmails command line tool", () => {
  it("should send out emails to the expected subscribed emails in our database", async () => {
    rmSync("./output", { recursive: true, force: true });
    mkdirSync("./output");
    await subscribeUseCase("webdevcody@gmail.com");
    await subscribeUseCase("bob@example.com");

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
    const emails = readdirSync(`./output/${dir}`);
    expect(emails.length).toEqual(2);
  });
});
