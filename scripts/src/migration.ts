import "dotenv/config";
import { remove, scan } from "@wdc-newsletter/business/src/persistence/dynamo";
import { getDynamoConfig } from "./util/getConfigs";
import { verifyEnv } from "./util/verifyEnv";

["REGION", "ACCESS_KEY", "SECRET_KEY", "DYNAMO_ENDPOINT"].forEach(verifyEnv);

const dynamoConfig = getDynamoConfig();

async function main() {
  const subscriptions = await scan(dynamoConfig);
  const toDeleteList = subscriptions.filter((item) =>
    item.pk.startsWith("subscription|")
  );

  for (const toDelete of toDeleteList) {
    console.log("deleting", toDelete);
    await remove(dynamoConfig, {
      pk: toDelete.pk,
      sk: toDelete.sk,
    });
  }
}

main().catch(console.error);
