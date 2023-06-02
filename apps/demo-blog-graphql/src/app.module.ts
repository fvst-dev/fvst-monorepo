import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostService } from './post.service';
import { CommentService } from './comment.service';
import { PrismaService } from '@packages/prisma/dist/prisma.service';
import { PostResolver } from './post.resolver';
import { CommentResolver } from './comment.resolver';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppController } from './app.controller';
import { PrismaClient } from '@~internal/prisma_demo/client';
import { AppService } from './app.service';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { User } from './user.entity';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { path: 'src/schema.graphql', federation: 2 },
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController],
  providers: [
    PostService,
    CommentService,
    PostResolver,
    CommentResolver,
    AppService,
    {
      provide: PrismaService,
      useFactory: () => {
        return new PrismaService(new PrismaClient());
      },
    },
  ],
})
export class AppModule {}
