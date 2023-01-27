import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PORT } from "./utils/config";
import schema from "./graphql/schema";

(async () => {
  const server = new ApolloServer({
    schema,
    introspection: true,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
