import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param, ParseUUIDPipe,
  Post,
  Put,
  Query, UseGuards
} from "@nestjs/common";
import {
  ApiBadRequestResponse, ApiCookieAuth,
  ApiCreatedResponse, ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { ProductDto } from "./dto/product.dto";
import { ProductsService } from "./products.service";
import { ProductCreateDto } from "./dto/product.create.dto";
import { NewSpecialDto } from "./dto/new-special.dto";
import { SpecialDto } from "./dto/special.dto";
import { ExistingSpecialDto } from "./dto/existing-special.dto";
import { ProductType } from "@prisma/client";
import { ProductUpdateDto } from "./dto/product.update.dto";
import { UniqueProductCreateDto } from "./dto/unique-product.create.dto";
import { UniqueProductDto } from "./dto/unique-product.dto";
import { AuthGuard } from "../auth/auth.guard";
import { SessionClaimValidator } from "supertokens-node/lib/build/recipe/session";
import UserRoles from "supertokens-node/recipe/userroles";
import { IsUUID } from "class-validator";

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productService : ProductsService) {}
  @ApiOkResponse({description: 'Products was successfully received.', type: [ProductDto]})
  @Get('catalog')
  async getCatalog(@Query('page') page: number,
                   @Query('limit') limit: number): Promise<ProductDto[]>{
    return this.productService.getCatalog(page, limit);
  }

  @ApiOkResponse({description: 'Products was successfully received.', type: [ProductDto]})
  @Get('catalog/type/:type')
  async getCatalogType(@Param('type') type: ProductType,
                       @Query('page') page: number,
                       @Query('limit') limit: number): Promise<ProductDto[]>{
    return this.productService.getCatalogType(type, page, limit);
  }

  @ApiOkResponse({description: 'Products was successfully found.', type: [ProductDto]})
  @ApiNotFoundResponse({description: 'Products was not found.'})
  @Get('catalog/search')
  async search(@Query('request') request: string): Promise<ProductDto[]>{
    return this.productService.search(request);
  }

  @ApiCreatedResponse({description: 'Product was successfully created.', type: ProductDto})
  @ApiBadRequestResponse({description: 'Invalid product data.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For manager use only.'})
  @Post()
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('manager'),
    ],
  }))
  @ApiCookieAuth()
  async addProduct(@Body() product: ProductCreateDto): Promise<ProductDto>{
    return this.productService.addProduct(product);
  }

  @ApiOkResponse({description: 'Product was successfully found.', type: ProductDto})
  @ApiNotFoundResponse({description: 'Invalid productId'})
  @Get('product/:productId')
  async getProduct(@Param('productId', ParseUUIDPipe) productId: string): Promise<ProductDto>{
    return this.productService.getProduct(productId);
  }

  @ApiOkResponse({description: 'Product was successfully updated.', type: ProductDto})
  @ApiBadRequestResponse({description: 'Invalid product data.'})
  @ApiNotFoundResponse({description: 'Invalid productId.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For manager use only.'})
  @Put('product/:productId')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('manager'),
    ],
  }))
  @ApiCookieAuth()
  async updateProduct(@Param('productId', ParseUUIDPipe) productId: string, @Body() product: ProductUpdateDto): Promise<ProductDto>{
    return this.productService.updateProduct(productId, product);
  }

  @ApiOkResponse({description: 'Product was successfully deleted.'})
  @ApiNotFoundResponse({description: 'Invalid productId.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For manager use only.'})
  @Delete('product/:productId')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('manager'),
    ],
  }))
  @ApiCookieAuth()
  async deleteProduct(@Param('productId', ParseUUIDPipe) productName: string){
    await this.productService.deleteProduct(productName);
  }

  @ApiCreatedResponse({description: 'Product was successfully created.', type: UniqueProductDto})
  @ApiBadRequestResponse({description: 'Invalid product data.'})
  @ApiNotFoundResponse({description: 'Invalid productId.'})
  @Post('unique')
  async addUniqueProduct(@Body() product: UniqueProductCreateDto): Promise<UniqueProductDto>{
    return this.productService.addUniqueProduct(product);
  }

  @ApiOkResponse({description: 'Product was successfully found.', type: UniqueProductDto})
  @ApiNotFoundResponse({description: 'Invalid productId.'})
  @Get('unique/:productId')
  async getUniqueProduct(@Param('productId', ParseUUIDPipe) productId: string): Promise<UniqueProductDto>{
    return this.productService.getUniqueProduct(productId);
  }

  @ApiOkResponse({description: 'Product was successfully found.', type: UniqueProductDto})
  @ApiNotFoundResponse({description: 'Invalid productId.'})
  @Put('unique/:productId')
  async updateUniqueProduct(@Param('productId', ParseUUIDPipe) productId: string, @Body() product: UniqueProductCreateDto): Promise<UniqueProductDto>{
    return this.productService.updateUniqueProduct(productId, product);
  }

  @ApiOkResponse({description: 'Product was successfully deleted.'})
  @ApiNotFoundResponse({description: 'Invalid productId.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For manager use only.'})
  @Delete('unique/:productId')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('manager'),
    ],
  }))
  @ApiCookieAuth()
  async deleteUniqueProduct(@Param('productId', ParseUUIDPipe) productId: string){
    await this.productService.deleteUniqueProduct(productId);
  }

  @ApiCreatedResponse({description: 'Special was successfully created.', type: SpecialDto})
  @ApiBadRequestResponse({description: 'Invalid special data.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For manager use only.'})
  @Post('specials')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('manager'),
    ],
  }))
  @ApiCookieAuth()
  async addNewSpecialProduct(@Body() special: NewSpecialDto): Promise<SpecialDto>{
    return this.productService.addNewSpecialProduct(special);
  }

  @ApiCreatedResponse({description: 'Special was successfully created.', type: SpecialDto})
  @ApiBadRequestResponse({description: 'Invalid special data.'})
  @ApiNotFoundResponse({description: 'Invalid productId.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For manager use only.'})
  @Post('specials/:productId')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('manager'),
    ],
  }))
  @ApiCookieAuth()
  async addSpecialProduct(@Param('productId', ParseUUIDPipe) productId: string, @Body() special: ExistingSpecialDto): Promise<SpecialDto>{
    return this.productService.addSpecialProduct(productId, special);
  }

  @ApiOkResponse({description: 'Special was successfully deleted.'})
  @ApiNotFoundResponse({description: 'Invalid specialId.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For manager use only.'})
  @Delete('specials/:specialId/delete')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('manager'),
    ],
  }))
  @ApiCookieAuth()
  async deleteSpecialProduct(@Param('specialId', ParseUUIDPipe) specialId: string){
    await this.productService.deleteSpecialProduct(specialId);
  }

  @ApiOkResponse({description: 'Special was successfully deleted.'})
  @ApiNotFoundResponse({description: 'Invalid specialId.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For manager use only.'})
  @Delete('specials/:specialId/delete-with-product')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('manager'),
    ],
  }))
  @ApiCookieAuth()
  async deleteSpecialProductWithProduct(@Param('specialId', ParseUUIDPipe) specialId: string){
    await this.productService.deleteSpecialProductWithProduct(specialId);
  }

  @ApiOkResponse({description: 'Specials was successfully received.', type: [SpecialDto]})
  @ApiNotFoundResponse({description: 'N0 specials'})
  @Get('specials')
  async getSpecialProducts(): Promise<SpecialDto[]>{
    return this.productService.getSpecialProducts();
  }

  @ApiOkResponse({description: 'Special was successfully received.', type: [SpecialDto]})
  @ApiNotFoundResponse({description: 'Invalid specialId'})
  @Get('specials/:specialId')
  async getSpecialProduct(@Param('specialId', ParseUUIDPipe) specialId: string): Promise<SpecialDto>{
    return this.productService.getSpecialProduct(specialId);
  }

  @ApiOkResponse({description: 'Special was successfully updated.', type: SpecialDto})
  @ApiBadRequestResponse({description: 'Invalid special data.'})
  @ApiNotFoundResponse({description: 'Invalid specialId.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For manager use only.'})
  @Put('specials/:specialId')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('manager'),
    ],
  }))
  @ApiCookieAuth()
  async updateSpecialProduct(@Param('specialId', ParseUUIDPipe) specialId: string, @Body() special: ExistingSpecialDto): Promise<SpecialDto>{
    return this.productService.updateSpecialProduct(specialId, special);
  }
}