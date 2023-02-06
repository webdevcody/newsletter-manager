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
import winston from "winston";
import expressWinston from "express-winston";
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
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

app.use(
  cors({
    origin: [
      "https://newsletter.webdevcody.com",
      "https://webdevcody.com",
      "https://www.webdevcody.com",
      "http://localhost:3000",
      "http://ui:3000",
    ],
  })
);

app.get("/status", async function (req: Request, res: Response) {
  res.send("ok");
});

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
    const unsubscribeId = req.params.unsubscribeId;
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
