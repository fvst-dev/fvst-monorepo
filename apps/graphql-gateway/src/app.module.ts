import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RemoteGraphQLDataSource, IntrospectAndCompose } from '@apollo/gateway';
import { Module, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Request } from 'express';
import { HealthModule } from '@package/nestjs-health';

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
        debug: true,
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ context, request }) {
              request?.http?.headers.set('authorization', context.authorization);
            },
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
