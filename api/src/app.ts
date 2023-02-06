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
import { verifyRecaptcha } from "./security/verifyRecaptcha";

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
  const { token, email } = req.body;
  try {
    await verifyRecaptcha(token, process.env.RECAPTCHA_SECRET);
  } catch (err) {
    return res.status(400).send("recaptcha token failed to validate");
  }

  await subscribeUseCase(
    {
      getSubscriptionByEmail: getSubscriptionByEmailFactory(dynamoConfig),
      saveSubscription: saveSubscriptionFactory(dynamoConfig),
    },
    email
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
