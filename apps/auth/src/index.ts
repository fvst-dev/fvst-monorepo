import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { NODE_ENV, PORT } from './utils/config';
import schema from './graphql/schema';
import context, { Context } from './graphql/context';

(async () => {
  const server = new ApolloServer<Context>({
    schema,
    introspection: NODE_ENV !== 'production',
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context,
  });

  console.log(`🚀  Server ready at: ${url}`);
  console.log(process.env.DATABASE_URL);
})();
