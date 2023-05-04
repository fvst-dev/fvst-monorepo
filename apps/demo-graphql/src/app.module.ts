import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TodoResolver } from './todo.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { JwtAuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@~internal/prisma_demo/client';
import { PrismaService } from '@libs/prisma/dist/prisma.service';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.graphql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [],
  providers: [
    TodoService,
    TodoResolver,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: PrismaService,
      useFactory: () => {
        return new PrismaService(new PrismaClient());
      },
    },
  ],
})
export class AppModule {}
