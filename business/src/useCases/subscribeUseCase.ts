import { v4 as uuidv4 } from "uuid";
import { welcome } from "../data/welcome";
import { getSubscriptionByEmail } from "../persistence/getSubscriptionByEmail";
import { saveSubscription } from "../persistence/saveSubscription";
import { sendEmail } from "../notifications/sendEmail";

export async function subscribeUseCase(email: string) {
  const subscription = await getSubscriptionByEmail(email);

  if (subscription) {
    return {
      message: "success",
    };
  }

  const unsubscribeId = uuidv4();
  await saveSubscription(email, unsubscribeId);
  await sendEmail({
    email,
    htmlBody: welcome,
    subject: "Welcome to the WebDevCody Newsletter",
    textBody:
      "Thank you for subscribing to the WebDevCody Newsletter.  Be on the lookout for updates in the future about my channel, tips and tricks on web development, links to useful learning resources, and more!",
    unsubscribeId,
  });

  return {
    message: "success",
  };
}
