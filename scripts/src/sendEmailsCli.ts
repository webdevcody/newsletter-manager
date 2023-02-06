import { sendEmails } from "./sendEmails";
import {
  getSubscriptionsFactory,
  sendEmailFactory,
  sendNewsletterUseCase,
} from "@wdc-newsletter/business";
import fs from "fs";
import { verifyEnv } from "./util/verifyEnv";
import { getDynamoConfig, getSesConfig } from "./util/getConfigs";

[
  "REGION",
  "ACCESS_KEY",
  "SECRET_KEY",
  "DYNAMO_ENDPOINT",
  "SES_ENDPOINT",
].forEach(verifyEnv);

const sesConfig = getSesConfig();
const dynamoConfig = getDynamoConfig();

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
