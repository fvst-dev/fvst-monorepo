import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoService } from './todo.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TodoResolver } from './todo.resolver';
import { JwtAuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PrismaService } from './prisma.service';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
@Module({
  imports: [
    ConfigModule.forRoot(),
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
    TodoService,
    TodoResolver,
    JwtStrategy,
    JwtAuthGuard,
    PrismaService,
  ],
})
export class AppModule {}
