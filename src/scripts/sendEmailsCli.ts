import { config } from "dotenv";
config();
import { sendEmails } from "./sendEmails";
import { sendNewsletterUseCase } from "../server/api/useCases/sendNewsletterUseCase";
import fs from "fs";

sendEmails({
  getArguments: () => process.argv?.slice(2),
  readFile: (filePath: string) => fs.readFileSync(filePath, "utf-8"),
  sendNewsletterUseCase,
}).catch((error) => {
  throw error;
});
