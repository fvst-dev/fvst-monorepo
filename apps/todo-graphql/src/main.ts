import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO do better cors
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
