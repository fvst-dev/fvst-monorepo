import { setContext } from '@apollo/client/link/context';
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { config } from './config';

const httpLink = new HttpLink({
  uri: config.GRAPH_QL_GATEWAY_URL,
});

export const client = () => {
  const authMiddleware = setContext(async (operation, { headers }) => {
    const { token } = await fetch('/api/auth/token').then((res) => res.json());

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  return new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });
};
