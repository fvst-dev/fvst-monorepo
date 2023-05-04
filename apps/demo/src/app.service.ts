import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): { status: boolean } {
    return { status: true };
  }
}
