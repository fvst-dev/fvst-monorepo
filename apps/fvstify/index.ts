import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { appRouter } from "./src/router/router";

const server = fastify({
  maxParamLength: 5000,
});

server.register(cors, { origin: "*" });

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter },
});

(async () => {
  try {
    await server.listen({ port: 5000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
