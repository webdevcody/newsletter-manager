import { SES } from "aws-sdk";
import throttledQueue from "throttled-queue";
import { env } from "../config/constants";

const ses = new SES({
  region: env.REGION,
  credentials: {
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_KEY,
  },
  endpoint: env.SES_ENDPOINT,
});

const throttle = throttledQueue(5, 1000, true);

export function sendEmail({
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

  return throttle(() => {
    console.info(`sending email to ${email}`);
    return ses
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
        ReturnPath: "webdevcody@gmail.com",
        Source: "WebDevCody Newsletter <newsletter@webdevcody.com>",
      })
      .promise()
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }).catch((err) => {
    console.error(err);
    throw err;
  });
}
