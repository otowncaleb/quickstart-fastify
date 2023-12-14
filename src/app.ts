import fastifyFactory, { type FastifyInstance } from "fastify";
import { env } from "./plugins";
import { configureLogger } from "./logger";
import { routes } from "./routes";

export async function initFastify(): Promise<FastifyInstance> {
  const fastify = await fastifyFactory({
    ...configureLogger(),
  });

  // Configure plugins
  await fastify.register(env);

  // Register routes
  await fastify.register(routes);

  return fastify;
}
