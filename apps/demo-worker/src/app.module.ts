import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranscribeModule } from './transcribe/transcribe.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'todo',
    }),
    TranscribeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
