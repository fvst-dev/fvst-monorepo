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

const auth = new GoogleAuth();

const fetcher = async (url: string, init: FetcherRequestInit | undefined): Promise<any> => {
  const headers = await auth.getRequestHeaders(url);
  const credentialBody = await auth.getCredentials();

  const customInit = {
    ...init,
    headers: {
      ...init?.headers,
      ...headers,
    },
  };
  console.log('credentialBody', credentialBody);
  console.log('headers', headers);
  console.log('customInit', customInit);
  return await fetch(url, customInit);
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
