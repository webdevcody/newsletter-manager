import { useMutation } from "react-query";
import { env } from "../config/constants";

export function useSubscribe() {
  const { mutateAsync, isLoading } = useMutation(
    ({ email, token }: { email: string; token: string }) =>
      fetch(`${env.API_URL}/subscriptions`, {
        method: "POST",
        body: JSON.stringify({
          email,
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error("something went wrong");
        }
      })
  );

  return { subscribe: mutateAsync, isLoading };
}
