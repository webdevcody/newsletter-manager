import { type TSubscription } from "./getSubscriptionById";
import { remove } from "./dynamo";

export function removeSubscription(subscription: TSubscription) {
  return Promise.all([
    remove({
      pk: `subscription|${subscription.unsubscribeId}`,
      sk: `subscription|${subscription.unsubscribeId}`,
    }),
    remove({
      pk: `email|${subscription.email}`,
      sk: `email|${subscription.email}`,
    }),
  ]);
}
