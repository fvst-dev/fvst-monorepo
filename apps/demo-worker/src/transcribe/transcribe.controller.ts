import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('transcribe')
export class TranscribeController {
  constructor(
    @InjectQueue('audio') private readonly audioQueue: Queue,
    @InjectQueue('video') private readonly videoQueue: Queue
  ) {}

  @Post('audio')
  async audioTranscribe() {
    await this.audioQueue.add('transcribe', {
      file: 'audio.mp3',
    });
  }

  @Post('video')
  async videoTranscribe() {
    await this.videoQueue.add('transcribe', {
      file: 'video.mp4',
    });
  }
}
