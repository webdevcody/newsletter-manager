import express from "express";
import type { Request, Response } from "express";
import {
  getSubscriptionByEmailFactory,
  getSubscriptionByIdFactory,
  removeSubscriptionFactory,
  saveSubscriptionFactory,
  subscribeUseCase,
  unsubscribeUseCase,
} from "@wdc-newsletter/business";
import cors from "cors";
import { TDynamoConfig } from "@wdc-newsletter/business/src/persistence/dynamo";

export const app = express();

const dynamoConfig: TDynamoConfig = {
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  endpoint: process.env.DYNAMO_ENDPOINT,
};

app.use(express.json());
app.use(
  cors({
    origin: ["https://newsletter.webdevcody.com", "http://localhost:3000"],
  })
);

app.post("/subscriptions", async function (req: Request, res: Response) {
  await subscribeUseCase(
    {
      getSubscriptionByEmail: getSubscriptionByEmailFactory(dynamoConfig),
      saveSubscription: saveSubscriptionFactory(dynamoConfig),
    },
    req.body.email
  );
  res.send("subscribed");
});

app.delete(
  "/subscriptions/:unsubscribeId",
  async function (req: Request, res: Response) {
    const unsubscribeId = JSON.parse(req.params.unsubscribeId);
    await unsubscribeUseCase(
      {
        getSubscriptionById: getSubscriptionByIdFactory(dynamoConfig),
        removeSubscription: removeSubscriptionFactory(dynamoConfig),
      },
      unsubscribeId
    );
    res.send("unsubscribed");
  }
);
