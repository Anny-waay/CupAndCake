import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Product } from "../products/interfaces/product.interface";
import { UniqueProduct } from "../products/interfaces/unique-product.interface";
import { UniqueProductDto } from "../products/dto/unique-product.dto";
import { ShoppingCartService } from "./shopping-cart.service";

@ApiTags('shopping-cart')
@Controller('api/shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService : ShoppingCartService) {}
  @Get('products/:user_id')
  getProducts(@Param('user_id') userId: string): Promise<Product[]> {
    return this.shoppingCartService.getProducts(userId);
  }

  @Post('product/:user_id')
  addProduct(@Param('user_id') userId: string, @Body() productName: string): Promise<Product> {
    return this.shoppingCartService.addProduct(userId, productName);
  }

  @Delete('product/:user_id')
  deleteProduct(@Param('user_id') userId: string, @Body() productName: string): Promise<void> {
    return this.shoppingCartService.deleteProduct(userId, productName);
  }

  @Get('unique_products/:user_id')
  getUniqueProducts(@Param('user_id') userId: string): Promise<UniqueProduct[]> {
    return this.shoppingCartService.getUniqueProducts(userId);
  }

  @Post('unique_product/:user_id')
  addUniqueProduct(@Param('user_id') userId: string, @Body() product: UniqueProductDto): Promise<UniqueProduct> {
    return this.shoppingCartService.addUniqueProduct(userId, product);
  }

  @Delete('unique_product/:user_id')
  deleteUniqueProduct(@Param('user_id') userId: string, @Body() product: UniqueProductDto): Promise<void> {
    return this.shoppingCartService.deleteUniqueProduct(userId, product);
  }
}