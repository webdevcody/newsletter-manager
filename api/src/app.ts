import express from "express";
import type { Request, Response } from "express";
import { subscribeUseCase, unsubscribeUseCase } from "@wdc-newsletter/business";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://newsletter.webdevcody.com", "http://localhost:3000"],
  })
);

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
