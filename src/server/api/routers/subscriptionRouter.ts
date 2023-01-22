import { z } from "zod";

import { DynamoDB } from 'aws-sdk';
import { createTRPCRouter, publicProcedure } from "../trpc";

const client = new DynamoDB.DocumentClient({
  region: 'us-east-1'
});

export const subscriptionRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      await client.put({
        TableName: 'webdevcody_newsletter',
        Item: {
          pk: `subscription|${input.email}`,
          sk: `subscription|${input.email}`,
          email: input.email,
        }
      }).promise()
      return {
        message: 'success',
      };
    }),
  unsubscribe: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      await client.delete({
        TableName: 'webdevcody_newsletter',
        Key: {
          pk: `subscription|${input.email}`,
          sk: `subscription|${input.email}`,
        }
      }).promise()
      return {
        message: 'success',
      };
    }),
});
