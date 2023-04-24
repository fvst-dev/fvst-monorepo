import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('todo')
export class TodoProcessor {
  private readonly logger = new Logger(TodoProcessor.name);

  @Process('info')
  handleTranscode(job: Job) {
    this.logger.debug('Create new Todo...');
    this.logger.debug(job.data);
    this.logger.debug('New Todo Created');
  }
}
