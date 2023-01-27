import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import isValidTokenLoader from "./utils/isValidTokenLoader";
import { PORT } from "./utils/config";
import getSupergraphSdl from "./utils/getSupergraphSdl";

type GatewayContext = {
  token?: string;
};

const gateway = new ApolloGateway({
  supergraphSdl: getSupergraphSdl(),
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource<GatewayContext>({
      url,
      willSendRequest({ request, context }) {
        if (context.token) {
          request.http?.headers.set("authorization", `Bearer ${context.token}`);
        }
      },
    });
  },
});

const server = new ApolloServer({
  gateway,
  introspection: true,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: PORT,
    },
    context: async ({ req, res }) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return {};
      }

      const isValidToken = await isValidTokenLoader.load(token);
      if (!isValidToken) {
        throw new Error("Invalid token");
      }

      return { token };
    },
  });
  console.log(`🚀  Server ready at ${url}`);
})();
