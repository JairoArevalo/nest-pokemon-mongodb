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
      transform: true, // Transforma los datos de entrada en el DTO
      transformOptions: {
        enableImplicitConversion: true, // Convierte los tipos de datos implicitos
      },
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();

