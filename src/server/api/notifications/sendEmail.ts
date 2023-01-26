import { SES } from "aws-sdk";
import { env } from "../../../env/server.mjs";

const ses = new SES({
  region: env.REGION,
  credentials: {
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_KEY,
  },
  endpoint: env.SES_ENDPOINT,
});

export async function sendEmail({
  email,
  htmlBody,
  subject,
  textBody,
  unsubscribeId,
}: {
  email: string;
  htmlBody: string;
  subject: string;
  textBody: string;
  unsubscribeId: string;
}) {
  const unsubscribeLinkHtml = ` <a href="${env.HOST_NAME}/unsubscribe/${unsubscribeId}" target="_blank;">Unsubscribe</a>`;
  const unsubscribeTextHtml = ` You can unsubscribe here: ${env.HOST_NAME}/unsubscribe/${unsubscribeId}`;

  await ses
    .sendEmail({
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: htmlBody + unsubscribeLinkHtml,
          },
          Text: {
            Charset: "UTF-8",
            Data: textBody + unsubscribeTextHtml,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      Source: "WebDevCody Newsletter <newsletter@webdevcody.com>",
    })
    .promise()
    .catch((err) => {
      console.error(err);
      throw err;
    });
}
