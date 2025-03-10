import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema:
    "https://subgraph.satsuma-prod.com/7b4d432e7d53/hopperlabs--103040/lagoon-vault-release/api",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "src/gql/": {
      preset: "client",
      config: {
        avoidOptionals: true, // Avoid optional types unless required
        scalars: {
          DateTime: "string", // Map custom scalars to TypeScript types
          BigInt: "BigIntish",
          Bytes: "`0x${string}`",
        },
      },
    },
  },
};

export default config;
