import { initFastify } from "./app";
import { config } from "./config";

export async function startServer(): Promise<void> {
  const fastify = await initFastify();
  try {
    await fastify.listen({ port: config.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
