import fastifyEnv, { type FastifyEnvOptions } from "@fastify/env";
import { type Static, Type } from "@sinclair/typebox";
import fastifyPlugin from "fastify-plugin";

const schema = Type.Object({
  NODE_ENV: Type.Union([
    Type.Literal("development"),
    Type.Literal("production"),
  ]),
  PORT: Type.Number({ default: 8080 }),
});

type Schema = Static<typeof schema>;

export const env = fastifyPlugin((fastify, opts, done) => {
  const envOptions: FastifyEnvOptions = {
    schema,
    dotenv: true,
  };
  fastifyEnv(fastify, envOptions, done);
});

declare module "fastify" {
  interface FastifyInstance {
    config: Schema;
  }
}
