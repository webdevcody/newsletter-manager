import { TGetSubscriptions } from "../persistence/getSubscriptions";
import { TSendEmail } from "../notifications/sendEmail";

export type TSendNewsletterUseCase = typeof sendNewsletterUseCase;

export async function sendNewsletterUseCase(
  {
    getSubscriptions,
    sendEmail,
  }: {
    getSubscriptions: TGetSubscriptions;
    sendEmail: TSendEmail;
  },
  {
    subject,
    body,
    text,
  }: {
    subject: string;
    body: string;
    text: string;
  }
) {
  const subscriptions = await getSubscriptions();

  await Promise.all(
    subscriptions.map((subscription) => {
      return sendEmail({
        email: subscription.email,
        htmlBody: body,
        textBody: text,
        unsubscribeId: subscription.unsubscribeId,
        subject,
      });
    })
  );
}
