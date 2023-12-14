FROM oven/bun:latest AS deps
# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#handling-kernel-signals
RUN apt-get update && apt-get install -y --no-install-recommends tini
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

FROM oven/bun:latest AS build
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Production image
FROM gcr.io/distroless/nodejs20-debian12 AS final
COPY --from=deps /usr/bin/tini /tini
ENV NODE_ENV production
WORKDIR /app
COPY --chown=nonroot:nonroot --from=deps /app/node_modules ./node_modules
COPY --chown=nonroot:nonroot --from=build /app/dist ./dist
COPY --chown=nonroot:nonroot --from=build /app/.env.vault ./
USER nonroot
ENTRYPOINT ["/tini", "--"]
CMD ["/nodejs/bin/node", "dist/index.js"]
