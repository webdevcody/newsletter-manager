import { SES } from "aws-sdk";
import throttledQueue from "throttled-queue";
import { env } from "../config/constants";

export type TSesConfig = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
};

function getSesClient(config: TSesConfig) {
  return new SES({
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    endpoint: config.endpoint,
  });
}

const throttle = throttledQueue(5, 1000, true);

export type TSendEmail = ReturnType<typeof sendEmailFactory>;

export function sendEmailFactory(config: TSesConfig) {
  return ({
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
  }) => {
    const unsubscribeLinkHtml = ` <a href="${env.HOST_NAME}/unsubscribe/${unsubscribeId}" target="_blank;">Unsubscribe</a>`;
    const unsubscribeTextHtml = ` You can unsubscribe here: ${env.HOST_NAME}/unsubscribe/${unsubscribeId}`;

    return throttle(() => {
      console.info(`sending email to ${email}`);
      return getSesClient(config)
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
  };
}
