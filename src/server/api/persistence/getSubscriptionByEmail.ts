import { get } from "./dynamo";

export function getSubscriptionByEmail(email: string) {
  return get({
    pk: `email|${email}`,
    sk: `email|${email}`,
  });
}
