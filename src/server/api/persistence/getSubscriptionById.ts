import { get } from "./dynamo";

export type TSubscription = {
  pk: string;
  sk: string;
  unsubscribeId: string;
  email: string;
};

export function getSubscriptionById(unsubscribeId: string) {
  return get({
    pk: `subscription|${unsubscribeId}`,
    sk: `subscription|${unsubscribeId}`,
  }).then((subscription) => subscription as TSubscription);
}
