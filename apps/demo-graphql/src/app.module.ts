import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoService } from './todo.service';
import { PrismaService } from './prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TodoResolver } from './todo.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { JwtAuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.NODE_ENV !== 'production',
      introspection: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TodoService,
    PrismaService,
    TodoResolver,
    JwtStrategy,
    JwtAuthGuard,
  ],
})
export class AppModule {}
