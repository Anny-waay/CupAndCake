import { ProductType } from "@prisma/client";

export class ProductDto {
  name: string;
  type: ProductType;
  price: number;
  picture: string;
}