import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";
import { Product } from "./interfaces/product.interface";
import { ProductsService } from "./products.service";
import { ProductDto } from "./dto/product.dto";
import { NewSpecialDto } from "./dto/new-special.dto";
import { Special } from "./interfaces/special.interface";
import { ExistingSpecialDto } from "./dto/existing-special.dto";
import { ProductType } from "@prisma/client";

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productService : ProductsService) {}
  @ApiOkResponse({description: 'Products was successfully received.'})
  @Get('catalog')
  async getCatalog(): Promise<Product[]>{
    return this.productService.getCatalog();
  }

  @Get('catalog/:type')
  async getCatalogType(@Param('type') type: ProductType): Promise<Product[]>{
    return this.productService.getCatalogType(type);
  }

  @ApiOkResponse({description: 'Products was successfully found.'})
  @ApiNotFoundResponse({description: 'Products was not found.'})
  @Get('catalog/search')
  async search(@Param('request') request: string): Promise<Product[]>{
    return this.productService.search(request);
  }

  @ApiCreatedResponse({description: 'Product was successfully created.'})
  @ApiBadRequestResponse({description: 'Invalid product data.'})
  @Post()
  async addProduct(@Body() product: ProductDto): Promise<Product>{
    return this.productService.addProduct(product);
  }

  @ApiOkResponse({description: 'Product was successfully found.'})
  @ApiNotFoundResponse({description: 'Product not found.'})
  @Get(':productId')
  async getProduct(@Param('productId') productId: string): Promise<Product>{
    return this.productService.getProduct(productId);
  }

  @ApiOkResponse({description: 'Product was successfully updated.'})
  @ApiBadRequestResponse({description: 'Invalid product data.'})
  @Put(':productId')
  async updateProduct(@Param('productId') productId: string, @Body() product: ProductDto): Promise<Product>{
    return this.productService.updateProduct(productId, product);
  }

  @ApiOkResponse({description: 'Product was successfully deleted.'})
  @ApiBadRequestResponse({description: 'Invalid productId.'})
  @Delete(':productId')
  async deleteProduct(@Param('productId') productName: string): Promise<void>{
    return this.productService.deleteProduct(productName);
  }

  @ApiCreatedResponse({description: 'Special was successfully created.'})
  @ApiBadRequestResponse({description: 'Invalid special data.'})
  @Post('specials')
  async addNewSpecialProduct(@Body() special: NewSpecialDto): Promise<Special>{
    return this.productService.addNewSpecialProduct(special);
  }

  @ApiCreatedResponse({description: 'Special was successfully created.'})
  @ApiBadRequestResponse({description: 'Invalid special data.'})
  @Post('specials/:productId')
  async addSpecialProduct(@Param('productId') productName: string, @Body() special: ExistingSpecialDto): Promise<Special>{
    return this.productService.addSpecialProduct(productName, special);
  }

  @ApiOkResponse({description: 'Special was successfully deleted.'})
  @ApiBadRequestResponse({description: 'Invalid specialId.'})
  @Delete('specials/:specialId')
  async deleteSpecialProduct(@Param('specialId') specialId: string): Promise<void>{
    return this.productService.deleteSpecialProduct(specialId);
  }

  @ApiOkResponse({description: 'Specials was successfully received.'})
  @Get('specials')
  async getSpecialProducts(): Promise<Special[]>{
    return this.productService.getSpecialProducts();
  }

  @ApiOkResponse({description: 'Special was successfully updated.'})
  @ApiBadRequestResponse({description: 'Invalid special data.'})
  @Put('specials/:specialId')
  async updateSpecialProduct(@Param('specialId') specialId: string, @Body() special: ExistingSpecialDto): Promise<Special>{
    return this.productService.updateSpecialProduct(specialId, special);
  }
}