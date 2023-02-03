export const env = {
  NODE_ENV: process.env.NODE_ENV,
  ACCESS_KEY: process.env.ACCESS_KEY!,
  SECRET_KEY: process.env.SECRET_KEY!,
  REGION: process.env.REGION!,
  HOST_NAME: process.env.HOST_NAME!,
  SES_ENDPOINT: process.env.SES_ENDPOINT!,
  DYNAMO_ENDPOINT: process.env.DYNAMO_ENDPOINT!,
  TABLE_NAME: process.env.TABLE_NAME || "webdevcody_newsletter",
};
