import fastifyFactory, { type FastifyInstance } from "fastify";
import { configureLogger } from "./logger";
import { routes } from "./routes";

export async function initFastify(): Promise<FastifyInstance> {
  const fastify = await fastifyFactory({
    ...configureLogger(),
  });

  await fastify.register(routes);

  return fastify;
}
