import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO do better cors
  app.enableCors();

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
