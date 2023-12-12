import { initFastify } from "./app";

export async function startServer(): Promise<void> {
  const fastify = await initFastify();
  try {
    await fastify.listen({ port: fastify.config.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
