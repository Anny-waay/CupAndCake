import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiForbiddenResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { FavouritesService } from "./favourites.service";
import { ProductDto } from "../products/dto/product.dto";
import { UniqueProductDto } from "../products/dto/unique-product.dto";
import { AuthGuard } from "../auth/auth.guard";
import { SessionClaimValidator } from "supertokens-node/lib/build/recipe/session";
import UserRoles from "supertokens-node/recipe/userroles";
import { FavouritesDto } from "./dto/favourites.dto";
import { Session } from "../auth/session.decorator";

@ApiTags('favourites')
@Controller('api/favourites')
export class FavouritesController {
  constructor(private readonly favouritesService : FavouritesService) {}

  @ApiOkResponse({description: 'Favourite products was successfully received.', type: FavouritesDto})
  @ApiNotFoundResponse({description: 'No products in favourites now'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For customer use only.'})
  @Get()
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('customer'),
    ],
  }))
  @ApiCookieAuth()
  getFavourites(@Session() session): Promise<FavouritesDto> {
    const userId = session.userId;
    return this.favouritesService.getFavourites(userId);
  }

  @ApiOkResponse({description: 'Product was successfully added to favourites.', type: [ProductDto]})
  @ApiNotFoundResponse({description: 'Invalid productId.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For customer use only.'})
  @Post('products/:productId')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('customer'),
    ],
  }))
  @ApiCookieAuth()
  addProduct(@Session() session, @Param('productId', ParseUUIDPipe) productId: string): Promise<ProductDto> {
    const userId = session.userId;
    return this.favouritesService.addProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Product was successfully deleted from favourites.'})
  @ApiBadRequestResponse({description: "Product is already in favourites"})
  @ApiNotFoundResponse({description: 'Invalid productId.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For customer use only.'})
  @Delete('products/:productId')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('customer'),
    ],
  }))
  @ApiCookieAuth()
  deleteProduct(@Session() session, @Param('product_id', ParseUUIDPipe) productId: string){
    const userId = session.userId;
    return this.favouritesService.deleteProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Unique product was successfully added to favourites.', type: [UniqueProductDto]})
  @ApiBadRequestResponse({description: "Product is already in favourites"})
  @ApiNotFoundResponse({description: 'Invalid productId.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For customer use only.'})
  @Post('unique-products/:productId')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('customer'),
    ],
  }))
  @ApiCookieAuth()
  addUniqueProduct(@Session() session, @Param('productId', ParseUUIDPipe) productId: string): Promise<UniqueProductDto> {
    const userId = session.userId;
    return this.favouritesService.addUniqueProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Unique product was successfully deleted from favourites.'})
  @ApiNotFoundResponse({description: 'Invalid productId.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For customer use only.'})
  @Delete('unique-products/:productId')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('customer'),
    ],
  }))
  @ApiCookieAuth()
  deleteUniqueProduct(@Session() session, @Param('product_id', ParseUUIDPipe) productId: string) {
    const userId = session.userId;
    return this.favouritesService.deleteUniqueProduct(userId, productId);
  }
}