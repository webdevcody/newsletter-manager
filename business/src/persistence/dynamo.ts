import { DynamoDB } from "aws-sdk";
import { env } from "../config/constants";

export type TDynamoConfig = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
};

function getClient({
  region,
  accessKeyId,
  secretAccessKey,
  endpoint,
}: TDynamoConfig) {
  return new DynamoDB.DocumentClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    endpoint,
  });
}

export function get(config: TDynamoConfig, key: { pk: string; sk: string }) {
  return getClient(config)
    .get({
      TableName: env.TABLE_NAME,
      Key: key,
    })
    .promise()
    .then(({ Item }) => Item);
}

export function remove(config: TDynamoConfig, key: { pk: string; sk: string }) {
  return getClient(config)
    .delete({
      TableName: env.TABLE_NAME,
      Key: key,
    })
    .promise();
}

export function scan(config: TDynamoConfig) {
  return getClient(config)
    .scan({
      TableName: env.TABLE_NAME,
    })
    .promise()
    .then(({ Items }) => Items ?? []) as Promise<{ pk: string; sk: string }[]>;
}

export function put(
  config: TDynamoConfig,
  item: {
    pk: string;
    sk: string;
    [key: string]: string | number | boolean;
  }
) {
  return getClient(config)
    .put({
      TableName: env.TABLE_NAME,
      Item: item,
    })
    .promise();
}

export function queryFirstByGSI1(config: TDynamoConfig, pk: string) {
  return getClient(config)
    .query({
      TableName: env.TABLE_NAME,
      IndexName: "gsi1",
      KeyConditionExpression: "#unsubscribeId = :pk",
      ExpressionAttributeValues: {
        ":pk": pk,
      },
      ExpressionAttributeNames: {
        "#unsubscribeId": "unsubscribeId",
      },
      Limit: 1,
    })
    .promise()
    .then((results) => results.Items?.[0]);
}
