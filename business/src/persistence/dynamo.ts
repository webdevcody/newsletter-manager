import { DynamoDB } from "aws-sdk";
import { env } from "../config/constants";

const client = new DynamoDB.DocumentClient({
  region: env.REGION,
  credentials: {
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_KEY,
  },
  endpoint: env.DYNAMO_ENDPOINT,
});

export function get(key: { pk: string; sk: string }) {
  return client
    .get({
      TableName: env.TABLE_NAME,
      Key: key,
    })
    .promise()
    .then(({ Item }) => Item);
}

export function remove(key: { pk: string; sk: string }) {
  return client
    .delete({
      TableName: env.TABLE_NAME,
      Key: key,
    })
    .promise();
}

export function scan() {
  return client
    .scan({
      TableName: env.TABLE_NAME,
    })
    .promise()
    .then(({ Items }) => Items ?? []) as Promise<{ pk: string; sk: string }[]>;
}

export function put(item: {
  pk: string;
  sk: string;
  [key: string]: string | number | boolean;
}) {
  return client
    .put({
      TableName: env.TABLE_NAME,
      Item: item,
    })
    .promise();
}
