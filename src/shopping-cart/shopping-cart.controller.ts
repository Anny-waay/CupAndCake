import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "../products/interfaces/product.interface";
import { UniqueProduct } from "../products/interfaces/unique-product.interface";
import { UniqueProductDto } from "../products/dto/unique-product.dto";
import { ShoppingCartService } from "./shopping-cart.service";

@ApiTags('shopping-cart')
@Controller('api/shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService : ShoppingCartService) {}

  @ApiOkResponse({description: 'Products from shopping cart was successfully received.'})
  @Get('products')
  getProducts(@Param('userId') userId: string): Promise<Product[]> {
    return this.shoppingCartService.getProducts(userId);
  }

  @ApiOkResponse({description: 'Product was successfully added to shopping cart.'})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Post('products/:productId')
  addProduct(@Param('userId') userId: string, @Param('productId') productId: string): Promise<Product> {
    return this.shoppingCartService.addProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Product was successfully deleted from favourites.'})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Delete('products/:productId')
  deleteProduct(@Param('userId') userId: string, @Param('productId') productId: string): Promise<void> {
    return this.shoppingCartService.deleteProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Unique products from shopping cart was successfully received.'})
  @Get('unique-products')
  getUniqueProducts(@Param('userId') userId: string): Promise<UniqueProduct[]> {
    return this.shoppingCartService.getUniqueProducts(userId);
  }

  @ApiOkResponse({description: 'Unique product was successfully added to shopping cart.'})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Post('unique-products/:productId')
  addUniqueProduct(@Param('userId') userId: string, @Param('product_id') productId: string): Promise<UniqueProduct> {
    return this.shoppingCartService.addUniqueProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Unique product was successfully deleted from shopping cart.'})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Delete('unique-products/:productId')
  deleteUniqueProduct(@Param('userId') userId: string, @Param('productId') productId: string): Promise<void> {
    return this.shoppingCartService.deleteUniqueProduct(userId, productId);
  }
}