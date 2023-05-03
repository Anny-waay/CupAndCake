import { Module } from '@nestjs/common';
import { ShoppingCartController } from "./shopping-cart.controller";
import { ShoppingCartService } from "./shopping-cart.service";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, PrismaService],
})
export class ShoppingCartModule {}