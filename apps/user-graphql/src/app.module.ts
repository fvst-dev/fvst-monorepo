import { Module } from '@nestjs/common';
import { PrismaService } from '@packages/prisma/dist/prisma.service';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppController } from './app.controller';
import { PrismaClient } from '@~internal/prisma_demo/client';
import { AppService } from './app.service';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { path: 'src/schema.graphql', federation: 2 },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    UserResolver,
    {
      provide: PrismaService,
      useFactory: () => {
        return new PrismaService(new PrismaClient());
      },
    },
  ],
})
export class AppModule {}
