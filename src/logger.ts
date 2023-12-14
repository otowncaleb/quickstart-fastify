import { type FastifyServerOptions } from "fastify";
import { config } from "./config";

export function configureLogger(): FastifyServerOptions {
  if (config.NODE_ENV === "development") {
    return {
      logger: {
        base: null,
        level: config.LOG_LEVEL,
        transport: {
          target: "pino-pretty",
        },
      },
    };
  } else {
    return {
      logger: {
        level: config.LOG_LEVEL,
      },
    };
  }
}
