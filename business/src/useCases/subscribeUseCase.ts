import { v4 as uuidv4 } from "uuid";
import { TSendEmail } from "../notifications";
import { TGetSubscriptionByEmail } from "../persistence/getSubscriptionByEmail";
import { TSaveSubscription } from "../persistence/saveSubscription";

export async function subscribeUseCase(
  {
    getSubscriptionByEmail,
    saveSubscription,
  }: {
    getSubscriptionByEmail: TGetSubscriptionByEmail;
    saveSubscription: TSaveSubscription;
  },
  email: string
) {
  const subscription = await getSubscriptionByEmail(email);

  if (subscription) {
    return {
      message: "success",
    };
  }

  const unsubscribeId = uuidv4();

  await saveSubscription(email, unsubscribeId);

  return {
    message: "success",
  };
}
