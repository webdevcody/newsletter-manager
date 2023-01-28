import { getSubscriptions } from "../persistence/getSubscriptions";
import { sendEmail } from "../notifications/sendEmail";

export type TSendNewsletterUseCase = typeof sendNewsletterUseCase;

export async function sendNewsletterUseCase({
  subject,
  body,
}: {
  subject: string;
  body: string;
}) {
  const subscriptions = await getSubscriptions();

  await Promise.all(
    subscriptions.map((subscription) => {
      console.info(`sending email to ${subscription.email}`);
      return sendEmail({
        email: subscription.email,
        htmlBody: body,
        textBody: "TODO",
        unsubscribeId: subscription.unsubscribeId,
        subject,
      });
    })
  );
}
