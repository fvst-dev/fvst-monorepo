import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { PrismaService } from './prisma.service';
import { BullModule } from '@nestjs/bull';
import { TranscribeModule } from './transcribe/transcribe.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TranscribeModule,
  ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService, PrismaService],
})
export class AppModule {}
