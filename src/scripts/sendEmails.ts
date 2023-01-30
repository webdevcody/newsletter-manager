import mjml2html from "mjml";
import { type TSendNewsletterUseCase } from "../server/api/useCases/sendNewsletterUseCase";

export async function sendEmails({
  getArguments,
  readFile,
  sendNewsletterUseCase,
}: {
  getArguments: () => string[];
  readFile: (file: string) => string;
  sendNewsletterUseCase: TSendNewsletterUseCase;
}) {
  const [subject, mjmlFilePath] = getArguments();

  if (!subject) {
    throw new Error(
      "subject is required as an argument $1 but was not provided"
    );
  }

  if (!mjmlFilePath) {
    throw new Error(
      "mjml file path is required as an argument $2 but was not provided"
    );
  }
  const mjmlToConvert = readFile(mjmlFilePath);
  const text = readFile(mjmlFilePath.replace(".mjml", ".txt"));
  const { html } = mjml2html(mjmlToConvert);
  await sendNewsletterUseCase({ subject, body: html, text });
}
