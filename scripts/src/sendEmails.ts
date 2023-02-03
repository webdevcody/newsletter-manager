import mjml2html from "mjml";
import {
  TGetSubscriptions,
  TSendEmail,
  type TSendNewsletterUseCase,
} from "@wdc-newsletter/business";

export async function sendEmails({
  getArguments,
  readFile,
  sendNewsletterUseCase,
  getSubscriptions,
  sendEmail,
}: {
  getArguments: () => string[];
  readFile: (file: string) => string;
  sendNewsletterUseCase: TSendNewsletterUseCase;
  getSubscriptions: TGetSubscriptions;
  sendEmail: TSendEmail;
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
  await sendNewsletterUseCase(
    {
      getSubscriptions,
      sendEmail,
    },
    { subject, body: html, text }
  );
}
