import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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
  @Get('catalog')
  async getCatalog(): Promise<Product[]>{
    return this.productService.getCatalog();
  }

  @Get('catalog/product_type')
  async getCatalogType(@Body() type: ProductType): Promise<Product[]>{
    return this.productService.getCatalogType(type);
  }

  @Get('catalog/search')
  async search(@Body() request: string): Promise<Product[]>{
    return this.productService.search(request);
  }

  @Post('product')
  async addProduct(@Body() product: ProductDto): Promise<Product>{
    return this.productService.addProduct(product);
  }

  @Get('product/:product_name')
  async getProduct(@Param('product_name') productName: string): Promise<Product>{
    return this.productService.getProduct(productName);
  }

  @Put('product/:product_name')
  async updateProduct(@Param('product_name') productName: string, @Body() product: ProductDto): Promise<Product>{
    return this.productService.updateProduct(productName, product);
  }

  @Delete('product/:product_name')
  async deleteProduct(@Param('product_name') productName: string): Promise<void>{
    return this.productService.deleteProduct(productName);
  }

  @Post('new_special')
  async addNewSpecialProduct(@Body() special: NewSpecialDto): Promise<Special>{
    return this.productService.addNewSpecialProduct(special);
  }

  @Post('special/:product_name')
  async addSpecialProduct(@Param('product_name') productName: string, @Body() special: ExistingSpecialDto): Promise<Special>{
    return this.productService.addSpecialProduct(productName, special);
  }

  @Delete('special/:product_name')
  async deleteSpecialProduct(@Param('product_name') productName: string): Promise<void>{
    return this.productService.deleteSpecialProduct(productName);
  }

  @Get('specials')
  async getSpecialProducts(): Promise<Special[]>{
    return this.productService.getSpecialProducts();
  }

  @Put('special/:product_name')
  async updateSpecialProduct(@Param('product_name') productName: string, @Body() special: ExistingSpecialDto): Promise<Special>{
    return this.productService.updateSpecialProduct(productName, special);
  }
}