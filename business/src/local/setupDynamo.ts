/* eslint-disable  */
import { DynamoDB } from "aws-sdk";
import { env } from "../config/constants";

const dynamo = new DynamoDB({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
  endpoint: process.env.DYNAMO_ENDPOINT!,
});

async function main() {
  console.info("creating table");
  console.log(process.env.REGION);
  console.log(process.env.ACCESS_KEY);
  console.log(process.env.SECRET_KEY);
  console.log(process.env.DYNAMO_ENDPOINT);
  await dynamo
    .createTable({
      TableName: env.TABLE_NAME,
      KeySchema: [
        {
          AttributeName: "pk",
          KeyType: "HASH",
        },
        {
          AttributeName: "sk",
          KeyType: "RANGE",
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: "pk",
          AttributeType: "S",
        },
        {
          AttributeName: "sk",
          AttributeType: "S",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    })
    .promise()
    .catch(async (err) => {
      console.error(err);
    });

  console.info("done creating table");
}

main();
