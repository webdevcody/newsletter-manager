import { TGetSubscriptionByEmail } from "../persistence";
import { TRemoveSubscription } from "../persistence/removeSubscription";

export type TRemoveBouncedEmailUseCase = typeof removeBouncedEmailUseCase;

export async function removeBouncedEmailUseCase(
  {
    getSubscriptionByEmail,
    removeSubscription,
  }: {
    getSubscriptionByEmail: TGetSubscriptionByEmail;
    removeSubscription: TRemoveSubscription;
  },
  email: string
) {
  const subscription = await getSubscriptionByEmail(email);

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
