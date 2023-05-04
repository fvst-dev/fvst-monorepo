import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoService } from './todo.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TodoResolver } from './todo.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { JwtAuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@~internal/prisma_demo/client';
import { PrismaService } from '@libs/prisma/dist/prisma.service';
import { IRequestWithUser } from './types';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }: { req: IRequestWithUser }) => ({ user: req.user }),
      playground: process.env.NODE_ENV !== 'production',
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
    {
      provide: PrismaService,
      useFactory: () => {
        return new PrismaService(new PrismaClient());
      },
    },
  ],
})
export class AppModule {}
