import { put, TDynamoConfig } from "./dynamo";

export type TSaveSubscription = ReturnType<typeof saveSubscriptionFactory>;

export function saveSubscriptionFactory(config: TDynamoConfig) {
  return async (email: string, unsubscribeId: string) => {
    await Promise.all([
      put(config, {
        pk: `email|${email}`,
        sk: `email|${email}`,
        email,
        unsubscribeId,
        createdAt: new Date().toISOString(),
      }),
    ]);
  };
}
