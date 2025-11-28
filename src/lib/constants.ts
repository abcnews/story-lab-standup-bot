const env = await load();

const SHOULD_INCLUDE_QUOTE = false;

const SLACK_URL = env["SLACK_URL"]
  ? env["SLACK_URL"]
  : Deno.env.get("SLACK_URL");

const PRODUCTION_ENV = env["PRODUCTION_ENV"]
  ? env["PRODUCTION_ENV"]
  : Deno.env.get("PRODUCTION_ENV");

export { SLACK_URL, PRODUCTION_ENV, SHOULD_INCLUDE_QUOTE };