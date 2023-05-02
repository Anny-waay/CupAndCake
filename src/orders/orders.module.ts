import { Module } from '@nestjs/common';
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { PrismaService } from "../prisma.service";
import { ShoppingCartService } from "../shopping-cart/shopping-cart.service";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, ShoppingCartService],
})
export class OrdersModule {}