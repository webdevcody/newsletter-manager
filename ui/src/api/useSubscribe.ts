import { useMutation } from "react-query";
import { env } from "../config/constants";

export function useSubscribe() {
  const { mutateAsync, isLoading } = useMutation((email: string) =>
    fetch(`${env.API_URL}/subscriptions`, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  return { subscribe: mutateAsync, isLoading };
}
