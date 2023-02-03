import { type TSubscription } from "./getSubscriptionById";
import { remove, TDynamoConfig } from "./dynamo";

export type TRemoveSubscription = ReturnType<typeof removeSubscriptionFactory>;

export function removeSubscriptionFactory(config: TDynamoConfig) {
  return async (subscription: TSubscription) => {
    Promise.all([
      remove(config, {
        pk: `subscription|${subscription.unsubscribeId}`,
        sk: `subscription|${subscription.unsubscribeId}`,
      }),
      remove(config, {
        pk: `email|${subscription.email}`,
        sk: `email|${subscription.email}`,
      }),
    ]);
  };
}
