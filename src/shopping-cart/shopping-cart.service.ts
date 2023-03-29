import { Injectable, NotImplementedException } from "@nestjs/common";
import { Product } from "../products/interfaces/product.interface";
import { UniqueProduct } from "../products/interfaces/unique-product.interface";
import { UniqueProductDto } from "../products/dto/unique-product.dto";

@Injectable()
export class ShoppingCartService {

  getProducts(userId: string): Promise<Product[]> {
    throw new NotImplementedException();
  }

  addProduct(userId: string, productName: string): Promise<Product> {
    throw new NotImplementedException();
  }

  deleteProduct(userId: string, productName: string): Promise<void> {
    throw new NotImplementedException();
  }

  getUniqueProducts(userId: string): Promise<UniqueProduct[]> {
    throw new NotImplementedException();
  }

  addUniqueProduct(userId: string, product: UniqueProductDto): Promise<UniqueProduct> {
    throw new NotImplementedException();
  }

  deleteUniqueProduct(userId: string, product: UniqueProductDto): Promise<void> {
    throw new NotImplementedException();
  }
}