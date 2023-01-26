import { getSubscriptionById } from "../persistence/getSubscriptionById";
import { removeSubscription } from "../persistence/removeSubscription";

export async function unsubscribeUseCase(unsubscribeId: string) {
  const subscription = await getSubscriptionById(unsubscribeId);

  if (!subscription) {
    return {
      message: "success",
    };
  }

  await removeSubscription(subscription);

  return {
    message: "success",
  };
}
