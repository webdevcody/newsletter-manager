import { type TSubscription } from "./getSubscriptionById";
import { scan } from "./dynamo";

export async function getSubscriptions() {
  const subscriptions = await scan();
  const filteredSubscriptions = subscriptions.filter((item) =>
    item.pk.startsWith("email|")
  );
  return filteredSubscriptions as TSubscription[];
}
