import { Body, Delete, Get, Injectable, NotImplementedException, Param, Post } from "@nestjs/common";
import { Product } from "../products/interfaces/product.interface";
import { UniqueProduct } from "../products/interfaces/unique-product.interface";
import { UniqueProductDto } from "../products/dto/unique-product.dto";

@Injectable()
export class FavouritesService {

  getProducts(userId: string): Promise<Product[]> {
    throw new NotImplementedException();
  }

  addProduct(userId: string, productId: string): Promise<Product> {
    throw new NotImplementedException();
  }

  deleteProduct(userId: string, productId: string): Promise<void> {
    throw new NotImplementedException();
  }

  getUniqueProducts(userId: string): Promise<UniqueProduct[]> {
    throw new NotImplementedException();
  }

  addUniqueProduct(userId: string, productId: string): Promise<UniqueProduct> {
    throw new NotImplementedException();
  }

  deleteUniqueProduct(userId: string, productId: string): Promise<void> {
    throw new NotImplementedException();
  }
}