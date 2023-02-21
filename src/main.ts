import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  Logger.log("Application is running on: http://localhost:${port}");
  await app.listen(port);
}
bootstrap();
