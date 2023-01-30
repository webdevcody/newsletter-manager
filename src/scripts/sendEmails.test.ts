import { sendEmails } from "./sendEmails";
import fs from "fs";
import { describe, expect, it, jest } from "@jest/globals";

const expectedHtml = fs.readFileSync(
  "./src/scripts/expectedHtml.html",
  "utf-8"
);

describe("sendEmails", () => {
  it("should throw an error if subject is not provided for the first argument", async () => {
    await expect(
      sendEmails({
        readFile: jest.fn(() => "contents"),
        getArguments: () => [],
        sendNewsletterUseCase: jest.fn(() => Promise.resolve()),
      })
    ).rejects.toThrow(
      "subject is required as an argument $1 but was not provided"
    );
  });

  it("should throw an error if mjml file path is not provided for the second argument", async () => {
    await expect(
      sendEmails({
        readFile: jest.fn(() => "contents"),
        getArguments: () => ["welcome to webdevcody newsletter"],
        sendNewsletterUseCase: jest.fn(() => Promise.resolve()),
      })
    ).rejects.toThrow(
      "mjml file path is required as an argument $2 but was not provided"
    );
  });

  it("should attempt to load in the mjml file, convert it to html, and send it out using the use case", async () => {
    const sendNewsletterUseCaseSpy = jest.fn(() => Promise.resolve());
    await sendEmails({
      readFile: () => "<mjml><mj-body></mj-body></mjml>",
      getArguments: () => [
        "welcome to webdevcody newsletter",
        "/some/path/to/a/file",
      ],
      sendNewsletterUseCase: sendNewsletterUseCaseSpy,
    });

    expect(sendNewsletterUseCaseSpy).toBeCalledWith({
      subject: "welcome to webdevcody newsletter",
      body: expectedHtml,
    });
  });
});
