import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";
import { ProductInterface } from "./interfaces/product.interface";
import { ProductsService } from "./products.service";
import { ProductDto } from "./dto/product.dto";
import { NewSpecialDto } from "./dto/new-special.dto";
import { SpecialInterface } from "./interfaces/special.interface";
import { ExistingSpecialDto } from "./dto/existing-special.dto";
import { ProductType } from "@prisma/client";
import { ProductUpdateDto } from "./dto/product.update.dto";
import { UniqueProductDto } from "./dto/unique-product.dto";
import { UniqueProductInterface } from "./interfaces/unique-product.interface";

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productService : ProductsService) {}
  @ApiOkResponse({description: 'Products was successfully received.', type: [ProductInterface]})
  @Get('catalog')
  async getCatalog(@Query('page') page: number,
                   @Query('limit') limit: number): Promise<ProductInterface[]>{
    return this.productService.getCatalog(page, limit);
  }

  @ApiOkResponse({description: 'Products was successfully received.', type: [ProductInterface]})
  @Get('catalog/type/:type')
  async getCatalogType(@Param('type') type: ProductType,
                       @Query('page') page: number,
                       @Query('limit') limit: number): Promise<ProductInterface[]>{
    return this.productService.getCatalogType(type, page, limit);
  }

  @ApiOkResponse({description: 'Products was successfully found.', type: [ProductInterface]})
  @ApiNotFoundResponse({description: 'Products was not found.'})
  @Get('catalog/search')
  async search(@Query('request') request: string): Promise<ProductInterface[]>{
    return this.productService.search(request);
  }

  @ApiCreatedResponse({description: 'Product was successfully created.', type: ProductInterface})
  @ApiBadRequestResponse({description: 'Invalid product data.'})
  @Post()
  async addProduct(@Body() product: ProductDto): Promise<ProductInterface>{
    return this.productService.addProduct(product);
  }

  @ApiOkResponse({description: 'Product was successfully found.', type: ProductInterface})
  @ApiNotFoundResponse({description: 'Product not found.'})
  @Get('product/:productId')
  async getProduct(@Param('productId') productId: string): Promise<ProductInterface>{
    return this.productService.getProduct(productId);
  }

  @ApiOkResponse({description: 'Product was successfully updated.', type: ProductInterface})
  @ApiBadRequestResponse({description: 'Invalid product data.'})
  @Put('product/:productId')
  async updateProduct(@Param('productId') productId: string, @Body() product: ProductUpdateDto): Promise<ProductInterface>{
    return this.productService.updateProduct(productId, product);
  }

  @ApiOkResponse({description: 'Product was successfully deleted.'})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Delete('product/:productId')
  async deleteProduct(@Param('productId') productName: string){
    await this.productService.deleteProduct(productName);
  }

  @ApiCreatedResponse({description: 'Product was successfully created.', type: ProductInterface})
  @ApiBadRequestResponse({description: 'Invalid product data.'})
  @Post('unique')
  async addUniqueProduct(@Body() product: UniqueProductDto): Promise<UniqueProductInterface>{
    return this.productService.addUniqueProduct(product);
  }

  @ApiOkResponse({description: 'Product was successfully found.', type: ProductInterface})
  @ApiNotFoundResponse({description: 'Product not found.'})
  @Get('unique/:productId')
  async getUniqueProduct(@Param('productId') productId: string): Promise<UniqueProductInterface>{
    return this.productService.getUniqueProduct(productId);
  }

  @ApiOkResponse({description: 'Product was successfully deleted.'})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Delete('unique/:productId')
  async deleteUniqueProduct(@Param('productId') productId: string){
    await this.productService.deleteUniqueProduct(productId);
  }

  @ApiCreatedResponse({description: 'Special was successfully created.', type: SpecialInterface})
  @ApiBadRequestResponse({description: 'Invalid special data.'})
  @Post('specials')
  async addNewSpecialProduct(@Body() special: NewSpecialDto): Promise<SpecialInterface>{
    return this.productService.addNewSpecialProduct(special);
  }

  @ApiCreatedResponse({description: 'Special was successfully created.', type: SpecialInterface})
  @ApiBadRequestResponse({description: 'Invalid special data.'})
  @Post('specials/:productId')
  async addSpecialProduct(@Param('productId') productName: string, @Body() special: ExistingSpecialDto): Promise<SpecialInterface>{
    return this.productService.addSpecialProduct(productName, special);
  }

  @ApiOkResponse({description: 'Special was successfully deleted.'})
  @ApiBadRequestResponse({description: 'Invalid specialId.'})
  @Delete('specials/:specialId/delete')
  async deleteSpecialProduct(@Param('specialId') specialId: string){
    await this.productService.deleteSpecialProduct(specialId);
  }

  @ApiOkResponse({description: 'Special was successfully deleted.'})
  @ApiBadRequestResponse({description: 'Invalid specialId.'})
  @Delete('specials/:specialId/delete-with-product')
  async deleteSpecialProductWithProduct(@Param('specialId') specialId: string){
    await this.productService.deleteSpecialProductWithProduct(specialId);
  }

  @ApiOkResponse({description: 'Specials was successfully received.', type: [SpecialInterface]})
  @Get('specials')
  async getSpecialProducts(): Promise<SpecialInterface[]>{
    return this.productService.getSpecialProducts();
  }

  @ApiOkResponse({description: 'Special was successfully updated.', type: SpecialInterface})
  @ApiBadRequestResponse({description: 'Invalid special data.'})
  @Put('specials/:specialId')
  async updateSpecialProduct(@Param('specialId') specialId: string, @Body() special: ExistingSpecialDto): Promise<SpecialInterface>{
    return this.productService.updateSpecialProduct(specialId, special);
  }
}