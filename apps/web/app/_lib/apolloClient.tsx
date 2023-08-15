'use client';
import { useAuth } from '@clerk/nextjs';
import { PropsWithChildren, useMemo } from 'react';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, InMemoryCache, from, createHttpLink } from '@apollo/client';

export const ApolloProviderWrapper = ({ children, gateway }: PropsWithChildren<{ gateway: string }>) => {
  const { getToken } = useAuth();

  const httpLink = createHttpLink({
    uri: gateway,
  });

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
  }, [getToken, httpLink]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
