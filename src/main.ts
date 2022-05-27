import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {config} from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config();
  app.setGlobalPrefix('v1');
  await app.listen(3005);
}

bootstrap();
