import * as serverless from "serverless-http";
import * as express from "express";
import type { Request, Response } from "express";
import { subscribeUseCase, unsubscribeUseCase } from "@wdc-newsletter/business";

const app = express();

app.use(express.json());

app.post("/subscriptions", async function (req: Request, res: Response) {
  await subscribeUseCase(req.body.email);
  res.send("subscribed");
});

app.delete(
  "/subscriptions/:unsubscribeId",
  async function (req: Request, res: Response) {
    const unsubscribeId = JSON.parse(req.params.unsubscribeId);
    await unsubscribeUseCase(unsubscribeId);
    res.send("unsubscribed");
  }
);

export const handler = serverless(app);
