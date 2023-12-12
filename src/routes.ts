import { type FastifyInstance } from "fastify";

export async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get("/ping", async () => {
    return "pong!";
  });
}
