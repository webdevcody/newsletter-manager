import {
  removeBouncedEmailUseCase,
  getSubscriptionByEmailFactory,
  removeSubscriptionFactory,
} from "@wdc-newsletter/business";
import { removeBouncedEmail } from "./removeBouncedEmail";
import { getDynamoConfig } from "./util/getConfigs";
import { verifyEnv } from "./util/verifyEnv";

["REGION", "ACCESS_KEY", "SECRET_KEY", "DYNAMO_ENDPOINT"].forEach(verifyEnv);

const dynamoConfig = getDynamoConfig();

const email = process.argv?.slice(2)[0];

removeBouncedEmail({
  getArguments: () => [email],
  removeBouncedEmailUseCase,
  getSubscriptionByEmail: getSubscriptionByEmailFactory(dynamoConfig),
  removeSubscription: removeSubscriptionFactory(dynamoConfig),
})
  .catch((error) => {
    throw error;
  })
  .finally(() => {
    console.info(`${email} was removed`);
  });
