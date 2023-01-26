/* eslint-disable  */
import { config } from "dotenv";
config();
import { DynamoDB } from "aws-sdk";
import DynamoDbLocal from "dynamodb-local";
import { TABLE_NAME } from "../server/api/persistence/dynamo";
const dynamoLocalPort = 8000;

const dynamo = new DynamoDB({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
  endpoint: process.env.DYNAMO_ENDPOINT!,
});

async function main() {
  console.log("launching dynamo");
  const child = await DynamoDbLocal.launch(
    dynamoLocalPort,
    null,
    [],
    false,
    true
  );

  console.log("should have created table");
  await dynamo
    .createTable({
      TableName: TABLE_NAME,
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
      await DynamoDbLocal.stopChild(child);
    });

  console.log("done creating table");
}

main();
