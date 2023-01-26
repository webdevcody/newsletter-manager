import { config } from "dotenv";
config();
import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import emails from "./emails.json";
import { TABLE_NAME } from "../server/api/persistence/dynamo";

const client = new DynamoDB.DocumentClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
});

async function subscribe(email: string) {
  const { Item: subscription } = await client
    .get({
      TableName: TABLE_NAME,
      Key: {
        pk: `email|${email}`,
        sk: `email|${email}`,
      },
    })
    .promise();

  if (subscription) {
    console.info(`skipping ${email} - already subscribed.`);
    return;
  }

  const unsubscribeId = uuidv4();
  await client
    .put({
      TableName: TABLE_NAME,
      Item: {
        pk: `subscription|${unsubscribeId}`,
        sk: `subscription|${unsubscribeId}`,
        email,
        unsubscribeId,
      },
    })
    .promise();
  await client
    .put({
      TableName: TABLE_NAME,
      Item: {
        pk: `email|${email}`,
        sk: `email|${email}`,
        email: email,
        unsubscribeId,
      },
    })
    .promise();
}

async function main() {
  for (const email of emails) {
    console.time(`subscribing ${email}`);
    await subscribe(email);
    console.timeEnd(`subscribing ${email}`);
  }
}

main().catch(console.error);
