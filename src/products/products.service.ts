import { Body, Get, Injectable, NotImplementedException, Param, Post, Put } from "@nestjs/common";
import { Product } from "./interfaces/product.interface";
import { ProductDto } from "./dto/product.dto";
import { NewSpecialDto } from "./dto/new-special.dto";
import { Special } from "./interfaces/special.interface";
import { ExistingSpecialDto } from "./dto/existing-special.dto";
import { ProductType } from "@prisma/client";

@Injectable()
export class ProductsService {

  async getCatalog(): Promise<Product[]>{
    throw new NotImplementedException();
  }

  async getCatalogType(type: ProductType): Promise<Product[]>{
    throw new NotImplementedException();
  }

  async search(request: string): Promise<Product[]>{
    throw new NotImplementedException();
  }

  async addProduct(product: ProductDto): Promise<Product>{
    throw new NotImplementedException();
  }

  async getProduct(productId: string): Promise<Product>{
    throw new NotImplementedException();
  }

  async updateProduct(productId: string, product: ProductDto): Promise<Product>{
    throw new NotImplementedException();
  }

  async deleteProduct(productId: string): Promise<void>{
    throw new NotImplementedException();
  }

  async addNewSpecialProduct(special: NewSpecialDto): Promise<Special>{
    throw new NotImplementedException();
  }

  async addSpecialProduct(productId: string, special: ExistingSpecialDto): Promise<Special>{
    throw new NotImplementedException();
  }

  async getSpecialProducts(): Promise<Special[]>{
    throw new NotImplementedException();
  }

  async updateSpecialProduct(productId: string, special: ExistingSpecialDto): Promise<Special>{
    throw new NotImplementedException();
  }

  async deleteSpecialProduct(productId: string): Promise<void>{
    throw new NotImplementedException();
  }
}