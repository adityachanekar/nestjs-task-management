import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');

  const logger = new Logger('Bootsrap');
  const app = await NestFactory.create(AppModule);

  if(process.env.NODE_ENV === 'development'){
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting Request from ${serverConfig.origin} `)
  }

  const port = process.env.PORT||serverConfig.port;
  await app.listen(port);
  logger.log(`Application Listenning on Port "${port}"`);
}
bootstrap();
