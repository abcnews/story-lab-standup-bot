import { sendUpdate } from "~/src/lib/sendUpdate.ts";
import { add } from "./lib/rs_lib.js";

// Just a test
console.log(add(1, 1));

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

Deno.serve((_req) => {
  return Response.json({ message: "Hello, World!" });
});
