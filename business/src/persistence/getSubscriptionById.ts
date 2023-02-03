import { get, TDynamoConfig } from "./dynamo";

export type TSubscription = {
  pk: string;
  sk: string;
  unsubscribeId: string;
  email: string;
};

export type TGetSubscriptionById = ReturnType<
  typeof getSubscriptionByIdFactory
>;

export function getSubscriptionByIdFactory(config: TDynamoConfig) {
  return (unsubscribeId: string) =>
    get(config, {
      pk: `subscription|${unsubscribeId}`,
      sk: `subscription|${unsubscribeId}`,
    }).then((subscription) => subscription as TSubscription);
}
