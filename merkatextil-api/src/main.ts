import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("asir")
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove all unspecified fields (default is false)
      forbidNonWhitelisted: true, // Enable this option to throw an error when a non-whitelisted field is found
    })
  );
  await app.listen(3000);
}
bootstrap();
