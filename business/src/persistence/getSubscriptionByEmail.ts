import { get, TDynamoConfig } from "./dynamo";
import { TSubscription } from "./getSubscriptionById";

export type TGetSubscriptionByEmail = ReturnType<
  typeof getSubscriptionByEmailFactory
>;

export function getSubscriptionByEmailFactory(config: TDynamoConfig) {
  return (email: string) =>
    get(config, {
      pk: `email|${email}`,
      sk: `email|${email}`,
    }).then((subscription) => subscription as TSubscription);
}
