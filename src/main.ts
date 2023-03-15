import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import hbs = require('hbs');
import { TimeLoadingInterceptor } from "./time.loading.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useGlobalInterceptors(new TimeLoadingInterceptor());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views', 'pages'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  const port = process.env.PORT || 3000;
  Logger.log(`Application is running on: http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
