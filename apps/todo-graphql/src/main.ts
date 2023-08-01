import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add a middleware to inject the user object into the response locals
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.user;
    next();
  });
  await app.listen(process.env.PORT || 5001);
}
bootstrap();
