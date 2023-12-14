import { type Static, Type } from "@sinclair/typebox";
import { envSchema } from "env-schema";

const schema = Type.Object({
  LOG_LEVEL: Type.Union(
    [
      Type.Literal("trace"),
      Type.Literal("debug"),
      Type.Literal("info"),
      Type.Literal("warn"),
      Type.Literal("error"),
      Type.Literal("fatal"),
    ],
    { default: "info" },
  ),
  NODE_ENV: Type.Union([
    Type.Literal("development"),
    Type.Literal("production"),
  ]),
  PORT: Type.Number({ default: 8080 }),
});

type Schema = Static<typeof schema>;

export const config = envSchema<Schema>({ schema, dotenv: true });
