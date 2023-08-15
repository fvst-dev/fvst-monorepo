import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RemoteGraphQLDataSource, IntrospectAndCompose } from '@apollo/gateway';
import { Module, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Request } from 'express';
import { HealthModule } from '@package/nestjs-health';
import { GoogleAuth } from 'google-auth-library';
import { FetcherRequestInit } from '@apollo/utils.fetcher';

const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/cloud-platform',
});

/**
 * Since gateway is the only public service and all services behind the gateway are private we need to add an id token
 * to every request to allow fetches.
 *
 * This is not needed on local development, so we default to null.
 * @param url
 */
const getGoogleCloudToken = async (url: string) => {
  try {
    const client = await auth.getIdTokenClient(url);
    const token = await client.idTokenProvider.fetchIdToken(url);
    return token;
  } catch (e) {
    return null;
  }
};
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const fetcher = async (url: string, init: FetcherRequestInit | undefined): Promise<any> => {
  const token = await getGoogleCloudToken(url);
  if (token) {
    console.log('Applying security token');
    const customInit = {
      ...init,
      headers: {
        ...init?.headers,
        'X-Serverless-Authorization': `Bearer ${token}`,
      },
    };
    return await fetch(url, customInit);
  }
  return fetch(url, init);
};

const handleAuth = ({ req }: { req: Request }) => {
  try {
    if (req.headers.authorization) {
      return {
        authorization: `${req.headers.authorization}`,
      };
    }
  } catch (err) {
    throw new UnauthorizedException('User unauthorized with invalid authorization Headers');
  }
};

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: handleAuth,
        playground: false,
        introspection: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      },
      gateway: {
        fetcher,
        debug: true,
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ context, request }) {
              if (context.authorization) {
                request?.http?.headers.set('authorization', context.authorization);
              }
            },
            fetcher,
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'todo', url: process.env.TODO_SERVICE_URL },
            { name: 'blog', url: process.env.BLOG_SERVICE_URL },
            { name: 'users', url: process.env.USER_SERVICE_URL },
          ].filter((subgraph) => !!subgraph.url),
        }),
      },
    }),
  ],
})
export class AppModule {}
