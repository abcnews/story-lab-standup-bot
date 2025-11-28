import { sendUpdate } from "~/src/lib/sendUpdate.ts";

import {
  CRON_EXPRESSION,
  CRON_EXPRESSION_DEV,
  PRODUCTION_ENV,
} from "~/src/lib/constants.ts";

const cronExpression = PRODUCTION_ENV === "production"
  ? CRON_EXPRESSION
  : CRON_EXPRESSION_DEV;

Deno.cron("Run main", cronExpression, () => {
  sendUpdate();
});
