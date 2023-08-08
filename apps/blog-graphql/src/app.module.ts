import { Module } from '@nestjs/common';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { PostService } from './post.service';
import { CommentService } from './comment.service';
import { PostResolver } from './post.resolver';
import { CommentResolver } from './comment.resolver';
import { User } from './user.entity';
import { PrismaService } from './prisma.service';
import { HealthModule } from '@package/nestjs-health';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { path: 'src/schema.graphql', federation: 2 },
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
      csrfPrevention: false,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
    }),
  ],
  providers: [PostService, CommentService, PostResolver, CommentResolver, PrismaService],
})
export class AppModule {}
