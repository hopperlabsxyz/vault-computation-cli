import { GraphQLClient } from "graphql-request";
import { LAGOON_API_URL } from "environnement";

export const apiClient = new GraphQLClient(LAGOON_API_URL, {
  headers: {
    "apollo-require-preflight": "true",
  },
});
