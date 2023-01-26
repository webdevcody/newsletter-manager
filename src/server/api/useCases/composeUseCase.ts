import { getSubscriptions } from "../persistence/getSubscriptions";
import { sendEmail } from "../notifications/sendEmail";

export async function composeUseCase(subject: string, body: string) {
  const subscriptions = await getSubscriptions();

  for (const subscription of subscriptions) {
    console.time("sending email");
    await sendEmail({
      email: subscription.email,
      htmlBody: body,
      textBody: "TODO",
      unsubscribeId: subscription.unsubscribeId,
      subject,
    });
    console.timeEnd("sending email");
  }

  return {
    message: "success",
  };
}
