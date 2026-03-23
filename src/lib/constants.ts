import { load } from "@std/dotenv";

const env = await load();

export const SHOULD_INCLUDE_CUSTOM_MESSAGE = true;

export const SLACK_URL = env["SLACK_URL"]
  ? env["SLACK_URL"]
  : Deno.env.get("SLACK_URL");

export const PRODUCTION_ENV = env["PRODUCTION_ENV"]
  ? env["PRODUCTION_ENV"]
  : Deno.env.get("PRODUCTION_ENV");

/**
 * Production (set time) - offset by GMT
 */
// SUN=1, MON=2, TUE=3, WED=4, THU=5
export const CRON_EXPRESSION = "30 23 * * 7,1,2,3,4";
export const CRON_EXPRESSION_DEV = "* * * * *";
