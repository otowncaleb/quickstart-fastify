import fastifyFactory from "fastify";

export async function startServer(): Promise<void> {
  const fastify = fastifyFactory();

  fastify.get("/ping", async () => {
    return "pong!";
  });

  try {
    await fastify.listen({ port: 8080 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
