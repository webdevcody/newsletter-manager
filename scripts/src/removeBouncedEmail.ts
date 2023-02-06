import {
  TGetSubscriptionByEmail,
  TRemoveBouncedEmailUseCase,
  TRemoveSubscription,
} from "@wdc-newsletter/business";

export async function removeBouncedEmail({
  getArguments,
  removeBouncedEmailUseCase,
  getSubscriptionByEmail,
  removeSubscription,
}: {
  getArguments: () => string[];
  removeBouncedEmailUseCase: TRemoveBouncedEmailUseCase;
  getSubscriptionByEmail: TGetSubscriptionByEmail;
  removeSubscription: TRemoveSubscription;
}) {
  const [email] = getArguments();

  if (!email) {
    throw new Error("email is required as an argument but was not provided");
  }

  await removeBouncedEmailUseCase(
    {
      getSubscriptionByEmail,
      removeSubscription,
    },
    email
  );
}
