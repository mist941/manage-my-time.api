import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {config} from 'dotenv';
import {ValidationPipe} from '@nestjs/common';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config();
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT,  '0.0.0.0');
}

bootstrap();
