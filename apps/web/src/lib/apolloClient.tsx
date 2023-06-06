/* eslint-disable turbo/no-undeclared-env-vars */
import { useAuth } from '@clerk/nextjs';
import { PropsWithChildren, useMemo } from 'react';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URI,
});
export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const { getToken } = useAuth();

  const client = useMemo(() => {
    const authMiddleware = setContext(async (_, { headers }) => {
      const token = await getToken({ template: 'test' });
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
  }, [getToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
