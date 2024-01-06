import { defineConfig } from "cypress";
import { mkdirSync, readdirSync, readFileSync, rmSync } from "fs";
import { DynamoDB } from "aws-sdk";
import { env } from "@wdc-newsletter/business";
import fsExtra from "fs-extra";

const OUTPUT_EMAIL_FILE_PATH = "./output";

const client = new DynamoDB.DocumentClient({
  region: env.REGION,
  credentials: {
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_KEY,
  },
  endpoint: env.DYNAMO_ENDPOINT,
});

type TDynamoItem = {
  pk: string;
  sk: string;
};

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1400,
    setupNodeEvents(on) {
      on("task", {
        recreateOutputDirectory: () => {
          fsExtra.emptyDirSync(OUTPUT_EMAIL_FILE_PATH);
          return null;
        },
        getSentEmails: () => {
          const [dir] = readdirSync(OUTPUT_EMAIL_FILE_PATH);
          console.log("dir", dir);
          if (!dir) throw new Error("no emails sent");
          const emailDirectory = readdirSync(
            `${OUTPUT_EMAIL_FILE_PATH}/${dir}`
          );

          const allHeadersContent = emailDirectory.map((directory) => ({
            headers: readFileSync(
              `${OUTPUT_EMAIL_FILE_PATH}${dir}/${directory}/headers.txt`,
              "utf-8"
            ),
            html: readFileSync(
              `${OUTPUT_EMAIL_FILE_PATH}/${dir}/${directory}/body.html`,
              "utf-8"
            ),
          }));
          return allHeadersContent;
        },
        getSubscriberByEmail: (email) => {
          return client
            .get({
              TableName: env.TABLE_NAME,
              Key: {
                pk: `email|${email}`,
                sk: `email|${email}`,
              },
            })
            .promise()
            .then(({ Item }) => Item ?? null);
        },
        clearDatabase: async () => {
          const allItems = await client
            .scan({
              TableName: env.TABLE_NAME,
            })
            .promise();
          if (!allItems.Items) return null;
          return await Promise.all(
            allItems.Items.map((item: Partial<TDynamoItem>) =>
              client
                .delete({
                  TableName: env.TABLE_NAME,
                  Key: {
                    pk: item.pk,
                    sk: item.sk,
                  },
                })
                .promise()
            )
          );
        },
      });
    },
  },
});
