import { type TSubscription } from "./getSubscriptionById";
import { scan, TDynamoConfig } from "./dynamo";

export type TGetSubscriptions = ReturnType<typeof getSubscriptionsFactory>;

export function getSubscriptionsFactory(config: TDynamoConfig) {
  return async function () {
    const subscriptions = await scan(config);
    const filteredSubscriptions = subscriptions.filter((item) =>
      item.pk.startsWith("email|")
    );
    return filteredSubscriptions as TSubscription[];
  };
}
