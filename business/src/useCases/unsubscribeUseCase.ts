import { TGetSubscriptionById } from "../persistence";
import { TRemoveSubscription } from "../persistence/removeSubscription";

export async function unsubscribeUseCase(
  {
    getSubscriptionById,
    removeSubscription,
  }: {
    getSubscriptionById: TGetSubscriptionById;
    removeSubscription: TRemoveSubscription;
  },
  unsubscribeId: string
) {
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
