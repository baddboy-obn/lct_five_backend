import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as process from 'process';
import {Telegram} from "telegraf";
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const thisBot: Telegram = new Telegram(process.env.BOT_TOKEN);

  // app.use(thisBot.setWebhook('/bot'));

  app.enableCors({
    credentials: true,
    origin: process.env.CORS_ORIGIN.includes(',')
      ? process.env.CORS_ORIGIN.split(',')
      : process.env.CORS_ORIGIN,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('LDT')
    .setDescription('Leader of digital transformation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap().then(() => {
  logger.log(`APP START ON ${process.env.APP_PORT} PORT`);
  logger.log(
    `SWAGGER http://${process.env.APP_HOST}:${process.env.APP_PORT}/docs`,
  );
});
