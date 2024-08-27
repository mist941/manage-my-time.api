import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {config} from 'dotenv';
import {ValidationPipe} from '@nestjs/common';
import * as process from 'process';

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config();
  setupGlobalConfig(app);
  await app.listen(PORT, HOST);
}

function setupGlobalConfig(app) {
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
}

bootstrap();