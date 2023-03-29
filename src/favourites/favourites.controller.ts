import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FavouritesService } from "./favourites.service";
import { Product } from "../products/interfaces/product.interface";
import { UniqueProduct } from "../products/interfaces/unique-product.interface";
import { UniqueProductDto } from "../products/dto/unique-product.dto";

@ApiTags('favourites')
@Controller('api/favourites')
export class FavouritesController {
  constructor(private readonly favouritesService : FavouritesService) {}
  @Get('products/:user_id')
  getProducts(@Param('user_id') userId: string): Promise<Product[]> {
    return this.favouritesService.getProducts(userId);
  }

  @Post('product/:user_id')
  addProduct(@Param('user_id') userId: string, @Body() productName: string): Promise<Product> {
    return this.favouritesService.addProduct(userId, productName);
  }

  @Delete('product/:user_id')
  deleteProduct(@Param('user-id') userId: string, @Body() productName: string): Promise<void> {
    return this.favouritesService.deleteProduct(userId, productName);
  }

  @Get('unique-products/:user_id')
  getUniqueProducts(@Param('user_id') userId: string): Promise<UniqueProduct[]> {
    return this.favouritesService.getUniqueProducts(userId);
  }

  @Post('unique-product/:user_id')
  addUniqueProduct(@Param('user_id') userId: string, @Body() product: UniqueProductDto): Promise<UniqueProduct> {
    return this.favouritesService.addUniqueProduct(userId, product);
  }

  @Delete('unique-product/:user_id')
  deleteUniqueProduct(@Param('user_id') userId: string, @Body() product: UniqueProductDto): Promise<void> {
    return this.favouritesService.deleteUniqueProduct(userId, product);
  }
}