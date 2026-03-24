import { get } from "env-var";

export const LAGOON_API_URL = get("LAGOON_API_URL")
  .default("https://api.lagoon.finance/query")
  .asString();
