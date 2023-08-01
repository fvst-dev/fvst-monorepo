import { Module } from '@nestjs/common';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { HealthModule } from '@package/nestjs-health';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    HealthModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { path: 'src/schema.graphql', federation: 2 },
      playground: false,
      csrfPrevention: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
    }),
  ],
  providers: [UserService, UserResolver, PrismaService],
})
export class AppModule {}
