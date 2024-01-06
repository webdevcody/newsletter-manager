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
        {
          AttributeName: "unsubscribeId",
          AttributeType: "S",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: "gsi1",
          KeySchema: [
            {
              AttributeName: "unsubscribeId",
              KeyType: "HASH",
            },
            {
              AttributeName: "pk",
              KeyType: "RANGE",
            },
          ],
          Projection: {
            ProjectionType: "ALL",
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      ],
    })
    .promise()
    .catch(async (err) => {
      console.error(err);
    });

  console.info("done creating table");
}

main();
