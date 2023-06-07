import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('video')
export class VideoProcessor {
  private readonly logger = new Logger(VideoProcessor.name);

  @Process('transcribe')
  handleTranscode(job: Job) {
    this.logger.debug('Start video transcription...');
    this.logger.debug(job.data);
    this.logger.debug('Video transcription completed');
  }
}
