import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ProductInterface } from "../products/interfaces/product.interface";
import { ShoppingCartService } from "./shopping-cart.service";
import { ShoppingCartProductInterface } from "./interfaces/shopping-cart.product.interface";
import { ShoppingCartUniqueInterface } from "./interfaces/shopping-cart.unique.interface";
import { ShoppingCartSpecialInterface } from "./interfaces/shopping-cart.special.interface";

@ApiTags('shopping-cart')
@Controller('api/shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService : ShoppingCartService) {}

  @ApiOkResponse({description: 'Products from shopping cart was successfully received.', type: [ShoppingCartProductInterface]})
  @Get('products')
  getProducts(@Param('userId') userId: string): Promise<ShoppingCartProductInterface[]> {
    return this.shoppingCartService.getProducts(userId);
  }

  @ApiOkResponse({description: 'Products from shopping cart was successfully received.', type: [ShoppingCartSpecialInterface]})
  @Get('products')
  getSpecials(@Param('userId') userId: string): Promise<ShoppingCartSpecialInterface[]> {
    return this.shoppingCartService.getSpecials(userId);
  }

  @ApiOkResponse({description: 'Product was successfully added to shopping cart.', type: [ProductInterface]})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Post('products/:productId')
  addProduct(@Param('userId') userId: string, @Param('productId') productId: string): Promise<ShoppingCartProductInterface> {
    return this.shoppingCartService.addProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Product was successfully deleted from favourites.'})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Delete('products/:productId')
  deleteProduct(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.shoppingCartService.deleteProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Unique products from shopping cart was successfully received.', type: [ShoppingCartUniqueInterface]})
  @Get('unique-products')
  getUniqueProducts(@Param('userId') userId: string): Promise<ShoppingCartUniqueInterface[]> {
    return this.shoppingCartService.getUniqueProducts(userId);
  }

  @ApiOkResponse({description: 'Unique product was successfully added to shopping cart.', type: [ShoppingCartUniqueInterface]})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Post('unique-products/:productId')
  addUniqueProduct(@Param('userId') userId: string, @Param('product_id') productId: string): Promise<ShoppingCartUniqueInterface> {
    return this.shoppingCartService.addUniqueProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Unique product was successfully deleted from shopping cart.'})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Delete('unique-products/:productId')
  deleteUniqueProduct(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.shoppingCartService.deleteUniqueProduct(userId, productId);
  }
}