import { config } from "dotenv";
config();
import { sendEmails } from "./sendEmails";
import {
  getSubscriptionsFactory,
  sendEmailFactory,
  sendNewsletterUseCase,
  TSesConfig,
} from "@wdc-newsletter/business";
import fs from "fs";
import { TDynamoConfig } from "@wdc-newsletter/business/src/persistence/dynamo";

[
  process.env.REGION,
  process.env.ACCESS_KEY,
  process.env.SECRET_KEY,
  process.env.SES_ENDPOINT,
  process.env.DYNAMO_ENDPOINT,
].some((env) => {
  if (!env) {
    throw new Error("missing expected env variables");
  }
});

const sesConfig: TSesConfig = {
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  endpoint: process.env.SES_ENDPOINT,
};

const dynamoConfig: TDynamoConfig = {
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  endpoint: process.env.DYNAMO_ENDPOINT,
};

sendEmails({
  getArguments: () => process.argv?.slice(2),
  readFile: (filePath: string) => {
    return fs.readFileSync(filePath, "utf-8");
  },
  sendNewsletterUseCase,
  getSubscriptions: getSubscriptionsFactory(dynamoConfig),
  sendEmail: sendEmailFactory(sesConfig),
}).catch((error) => {
  throw error;
});
