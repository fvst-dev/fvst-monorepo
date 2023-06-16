/* eslint-disable turbo/no-undeclared-env-vars */
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { Module, UnauthorizedException } from '@nestjs/common';
import { IntrospectAndCompose } from '@apollo/gateway';
import { Request } from 'express';

const handleAuth = ({ req }: { req: Request }) => {
  try {
    if (req.headers.authorization) {
      return {
        authorization: `${req.headers.authorization}`,
      };
    }
  } catch (err) {
    throw new UnauthorizedException(
      'User unauthorized with invalid authorization Headers',
    );
  }
};

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: handleAuth,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      },
      gateway: {
        buildService({ name, url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ context, request }) {
              request?.http?.headers.set(
                'authorization',
                context['authorization'],
              );
            },
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'todo', url: process.env.TODO_SERVICE_URL },
            { name: 'posts', url: process.env.POSTS_SERVICE_URL },
            { name: 'users', url: process.env.USERS_SERVICE_URL },
          ].filter((subgraph) => !!subgraph.url),
        }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
