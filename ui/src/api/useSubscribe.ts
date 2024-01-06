import { useMutation } from "react-query";
import { env } from "../config/constants";

export function useSubscribe() {
  const { mutateAsync, isLoading } = useMutation(
    ({ email, token }: { email: string; token: string }) => {
      return fetch(`${env.API_URL}/subscriptions`, {
        method: "POST",
        body: JSON.stringify({
          email,
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
      });
    }
  );

  return { subscribe: mutateAsync, isLoading };
}
