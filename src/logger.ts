import { type FastifyServerOptions } from "fastify";

export function configureLogger(): FastifyServerOptions {
  if (process.env.NODE_ENV === "development") {
    return {
      logger: {
        base: null,
        transport: {
          target: "pino-pretty",
        },
      },
    };
  } else {
    return {
      logger: {
        base: null,
      },
    };
  }
}
