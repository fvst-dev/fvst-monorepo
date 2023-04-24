import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  @Process('transcribe')
  handleTranscode(job: Job) {
    this.logger.debug('Start audio transcription...');
    this.logger.debug(job.data);
    this.logger.debug('Audio transcription completed');
  }
}
