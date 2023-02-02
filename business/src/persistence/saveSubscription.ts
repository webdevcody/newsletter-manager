import { put } from "./dynamo";

export async function saveSubscription(email: string, unsubscribeId: string) {
  await Promise.all([
    put({
      pk: `email|${email}`,
      sk: `email|${email}`,
      email,
      unsubscribeId,
    }),
    put({
      pk: `subscription|${unsubscribeId}`,
      sk: `subscription|${unsubscribeId}`,
      email,
      unsubscribeId,
    }),
  ]);
}
