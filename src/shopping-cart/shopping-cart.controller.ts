import { Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiForbiddenResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { ProductDto } from "../products/dto/product.dto";
import { ShoppingCartService } from "./shopping-cart.service";
import { ShoppingCartProductDto } from "./dto/shopping-cart.product.dto";
import { ShoppingCartUniqueDto } from "./dto/shopping-cart.unique.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session.decorator";
import { SessionClaimValidator } from "supertokens-node/lib/build/recipe/session";
import UserRoles from "supertokens-node/recipe/userroles";
import { ShoppingCartDto } from "./dto/shopping-cart.dto";

@ApiTags('shopping-cart')
@Controller('api/shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService : ShoppingCartService) {}

  @ApiOkResponse({description: 'Products from shopping cart was successfully received.', type: [ShoppingCartDto]})
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
  getShoppingCart(@Session() session): Promise<ShoppingCartDto> {
    const userId = session.userId;
    return this.shoppingCartService.getShoppingCart(userId);
  }

  @ApiOkResponse({description: 'Product was successfully added to shopping cart.', type: [ShoppingCartProductDto]})
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
  addProduct(@Session() session, @Param('productId', ParseUUIDPipe) productId: string): Promise<ShoppingCartProductDto> {
    const userId = session.userId;
    return this.shoppingCartService.addProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Product was successfully deleted from favourites.hbs.'})
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
  deleteProduct(@Session() session, @Param('productId', ParseUUIDPipe) productId: string) {
    const userId = session.userId;
    return this.shoppingCartService.deleteProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Unique product was successfully added to shopping cart.', type: [ShoppingCartUniqueDto]})
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
  addUniqueProduct(@Session() session, @Param('product_id', ParseUUIDPipe) productId: string): Promise<ShoppingCartUniqueDto> {
    const userId = session.userId;
    return this.shoppingCartService.addUniqueProduct(userId, productId);
  }

  @ApiOkResponse({description: 'Unique product was successfully deleted from shopping cart.'})
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
  deleteUniqueProduct(@Session() session, @Param('productId', ParseUUIDPipe) productId: string) {
    const userId = session.userId;
    return this.shoppingCartService.deleteUniqueProduct(userId, productId);
  }
}