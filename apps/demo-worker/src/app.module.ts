import { Module } from '@nestjs/common';
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
})
export class AppModule {}
