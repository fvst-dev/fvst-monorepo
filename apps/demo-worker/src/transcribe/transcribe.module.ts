import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { VideoProcessor } from './video.processor';
import { AudioProcessor } from './audio.processor';
import { TranscribeController } from './transcribe.controller';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'audio',
      },
      {
        name: 'video',
      }
    ),
  ],
  controllers: [TranscribeController],
  providers: [AudioProcessor, VideoProcessor],
})
export class TranscribeModule {}
