import { Module } from '@nestjs/common';
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { PrismaService } from "../prisma.service";
import { AppGateway } from "../gateway/app.gateway";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, AppGateway],
})
export class ProductsModule {}