import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo permite los campos definidos en el DTO
      forbidNonWhitelisted: true, // No permite campos adicionales que no esten definidos en el DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
