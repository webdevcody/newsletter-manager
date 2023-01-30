import { getSubscriptions } from "../persistence/getSubscriptions";
import { sendEmail } from "../notifications/sendEmail";

export type TSendNewsletterUseCase = typeof sendNewsletterUseCase;

export async function sendNewsletterUseCase({
  subject,
  body,
  text,
}: {
  subject: string;
  body: string;
  text: string;
}) {
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
