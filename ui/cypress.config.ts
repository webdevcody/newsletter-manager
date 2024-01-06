import { defineConfig } from "cypress";
import { mkdirSync, readdirSync, readFileSync, rmSync } from "fs";
import { DynamoDB } from "aws-sdk";
import { TABLE_NAME } from "../src/config/constants";

const client = new DynamoDB.DocumentClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: "local",
    secretAccessKey: "local",
  },
  endpoint: "http://localhost:8000",
});

type TDynamoItem = {
  pk: string;
  sk: string;
};

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on("task", {
        recreateOutputDirectory: () => {
          rmSync("./output", { recursive: true, force: true });
          mkdirSync("./output");
          return null;
        },
        getSentEmails: () => {
          const [dir] = readdirSync("./output");
          if (!dir) throw new Error("no emails sent");
          const emailDirectory = readdirSync(`./output/${dir}`);

          const allHeadersContent = emailDirectory.map((directory) => ({
            headers: readFileSync(
              `./output/${dir}/${directory}/headers.txt`,
              "utf-8"
            ),
            html: readFileSync(
              `./output/${dir}/${directory}/body.html`,
              "utf-8"
            ),
          }));
          return allHeadersContent;
        },
        getSubscriberByEmail: (email) => {
          return client
            .get({
              TableName: TABLE_NAME,
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
              TableName: TABLE_NAME,
            })
            .promise();
          if (!allItems.Items) return null;
          return await Promise.all(
            allItems.Items.map((item: Partial<TDynamoItem>) =>
              client
                .delete({
                  TableName: TABLE_NAME,
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
