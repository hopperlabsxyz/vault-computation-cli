import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env["MAINNET_SUBGRAPH_URL"],
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "gql/": {
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
