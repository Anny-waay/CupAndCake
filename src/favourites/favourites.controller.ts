import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { FavouritesService } from "./favourites.service";
import { ProductInterface } from "../products/interfaces/product.interface";
import { UniqueProductInterface } from "../products/interfaces/unique-product.interface";
import { UniqueProductDto } from "../products/dto/unique-product.dto";
import { SpecialInterface } from "../products/interfaces/special.interface";

@ApiTags('favourites')
@Controller('api/favourites')
export class FavouritesController {
  constructor(private readonly favouritesService : FavouritesService) {}

  @ApiOkResponse({description: 'Favourite products was successfully received.', type: [ProductInterface]})
  @Get('products')
  getProducts(@Param('userId') userId: string): Promise<ProductInterface[]> {
    return this.favouritesService.getProducts(userId);
  }

  @ApiOkResponse({description: 'Product was successfully added to favourites.', type: [ProductInterface]})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Post('products/:productId')
  addProduct(@Param('userId') userId: string, @Param('productId') productId: string): Promise<ProductInterface> {
    return this.favouritesService.addProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Product was successfully deleted from favourites.'})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Delete('products/:productId')
  deleteProduct(@Param('userId') userId: string, @Param('product_id') productId: string){
    return this.favouritesService.deleteProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Favourite specials was successfully received.', type: [SpecialInterface]})
  @Get('specials')
  getSpecials(@Param('userId') userId: string): Promise<SpecialInterface[]> {
    return this.favouritesService.getSpecials(userId);
  }

  @ApiOkResponse({description: 'Favourite unique products was successfully received.', type: [UniqueProductInterface]})
  @Get('unique-products')
  getUniqueProducts(@Param('userId') userId: string): Promise<UniqueProductInterface[]> {
    return this.favouritesService.getUniqueProducts(userId);
  }

  @ApiOkResponse({description: 'Unique product was successfully added to favourites.', type: [UniqueProductInterface]})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Post('unique-products/:productId')
  addUniqueProduct(@Param('userId') userId: string, @Param('productId') productId: string): Promise<UniqueProductInterface> {
    return this.favouritesService.addUniqueProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Unique product was successfully deleted from favourites.'})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Delete('unique-products/:productId')
  deleteUniqueProduct(@Param('userId') userId: string, @Param('product_id') productId: string) {
    return this.favouritesService.deleteUniqueProduct(userId, productId);
  }
}