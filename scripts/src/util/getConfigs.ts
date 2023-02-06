import { TSesConfig } from "@wdc-newsletter/business";
import { TDynamoConfig } from "@wdc-newsletter/business/src/persistence/dynamo";

export function getSesConfig(): TSesConfig {
  return {
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    endpoint: process.env.SES_ENDPOINT,
  };
}

export function getDynamoConfig(): TDynamoConfig {
  return {
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    endpoint: process.env.DYNAMO_ENDPOINT,
  };
}
