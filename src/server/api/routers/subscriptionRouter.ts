import { z } from "zod";

import { DynamoDB, SES } from "aws-sdk";
import { createTRPCRouter, localOnlyProcedure, publicProcedure } from "../trpc";
import { v4 as uuidv4 } from "uuid";

const ses = new SES({
  region: "us-east-1",
});

const client = new DynamoDB.DocumentClient({
  region: "us-east-1",
});

type TSubscription = {
  pk: string;
  sk: string;
  unsubscribeId: string;
  email: string;
};

export const subscriptionRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      const { Item: subscription } = await client
        .get({
          TableName: "webdevcody_newsletter",
          Key: {
            pk: `email|${input.email}`,
            sk: `email|${input.email}`,
          },
        })
        .promise();

      if (subscription) {
        return {
          message: "success",
        };
      }

      const unsubscribeId = uuidv4();
      await client
        .put({
          TableName: "webdevcody_newsletter",
          Item: {
            pk: `subscription|${unsubscribeId}`,
            sk: `subscription|${unsubscribeId}`,
            email: input.email,
            unsubscribeId,
          },
        })
        .promise();
      await client
        .put({
          TableName: "webdevcody_newsletter",
          Item: {
            pk: `email|${input.email}`,
            sk: `email|${input.email}`,
            email: input.email,
            unsubscribeId,
          },
        })
        .promise();
      return {
        message: "success",
      };
    }),
  unsubscribe: localOnlyProcedure
    .input(z.object({ unsubscribeId: z.string() }))
    .mutation(async ({ input }) => {
      const subscription = await client
        .get({
          TableName: "webdevcody_newsletter",
          Key: {
            pk: `subscription|${input.unsubscribeId}`,
            sk: `subscription|${input.unsubscribeId}`,
          },
        })
        .promise()
        .then(({ Item }) => Item as TSubscription);

      if (!subscription) {
        return {
          message: "success",
        };
      }

      await client
        .delete({
          TableName: "webdevcody_newsletter",
          Key: {
            pk: `subscription|${input.unsubscribeId}`,
            sk: `subscription|${input.unsubscribeId}`,
          },
        })
        .promise();

      await client
        .delete({
          TableName: "webdevcody_newsletter",
          Key: {
            pk: `email|${subscription.email}`,
            sk: `email|${subscription.email}`,
          },
        })
        .promise();

      return {
        message: "success",
      };
    }),
  compose: publicProcedure
    .input(z.object({ subject: z.string(), body: z.string() }))
    .mutation(async ({ input }) => {
      const subscriptions = await client
        .scan({
          TableName: "webdevcody_newsletter",
        })
        .promise()
        .then(({ Items }) => (Items ?? []) as TSubscription[]);
      const filteredSubscriptions = subscriptions.filter((item) =>
        item.pk.startsWith("email|")
      );
      for (const subscription of filteredSubscriptions) {
        const unsubscribeLinkHtml = ` <a href="http://localhost:3000/unsubscribe/${subscription.unsubscribeId}" target="_blank;">Unsubscribe</a>`;
        const unsubscribeLinkText = ` Unsubscribe at http://localhost:3000/unsubscribe/${subscription.unsubscribeId}`;
        console.time("sending email");
        await ses
          .sendEmail({
            Destination: {
              ToAddresses: [subscription.email],
            },

            Message: {
              Body: {
                Html: {
                  Charset: "UTF-8",
                  Data: input.body + unsubscribeLinkHtml,
                },
                Text: {
                  Charset: "UTF-8",
                  Data: input.body + unsubscribeLinkText,
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: input.subject,
              },
            },
            Source: "WebDevCody Newsletter <newsletter@webdevcody.com>",
          })
          .promise();
        console.timeEnd("sending email");
      }
      return {
        message: "success",
      };
    }),
});
