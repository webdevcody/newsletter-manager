import { sendEmailFactory } from "./sendEmail";
import { SES } from "aws-sdk";
import { env } from "../config/constants";

jest.mock("../config/constants", () => {
  return {
    env: {
      HOST_NAME: "https://newsletter.webdevcody.com",
    },
  };
});

jest.mock("aws-sdk", () => {
  const mockSES = {
    sendEmail: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  const mockSESConstructor = jest.fn(() => mockSES);

  return {
    SES: mockSESConstructor,
  };
});

describe("sendEmail", () => {
  it("should send an email", async () => {
    const sendEmail = sendEmailFactory({} as any);
    const mockSES = new SES();
    (mockSES.sendEmail().promise as any).mockResolvedValue({
      MessageId: "1234",
    });

    await sendEmail({
      email: "hello@example.com",
      htmlBody: "this is a test html",
      subject: "welcome!",
      textBody: "this is a test text",
      unsubscribeId: "abc-123",
    });

    expect(mockSES.sendEmail).toHaveBeenCalledWith({
      Destination: {
        ToAddresses: ["hello@example.com"],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `this is a test html<div style="text-align: center;">Seibert Software Solutions, LLC<br/>PO Box 913<br/>Harrison TN, 37341<br /><br /> <a href="${env.HOST_NAME}/unsubscribe/abc-123" target="_blank;">Unsubscribe</a></div>`,
          },
          Text: {
            Charset: "UTF-8",
            Data: `this is a test textSeibert Software Solutions, LLC @ PO Box 913, Harrison TN, 37341, You can unsubscribe here: ${env.HOST_NAME}/unsubscribe/abc-123`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "welcome!",
        },
      },
      ReturnPath: "webdevcody@gmail.com",
      Source: "WebDevCody Newsletter <newsletter@webdevcody.com>",
    });
  });
});
