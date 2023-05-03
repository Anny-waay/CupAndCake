import { ApiProperty } from "@nestjs/swagger";
import { Biscuit, Cream, Filling, ProductType, UniqueProduct } from "@prisma/client";
import { UniqueProductDto } from "../../products/dto/unique-product.dto";

export class ShoppingCartUniqueDto {
  @ApiProperty({
    description: 'unique product',
    example: {
      "id": "c3fba430-f60a-41c5-9430-5275ec392499",
      "name": "Клубничный торт",
      "price": 3299,
      "composition": "яйцо, мука, клубника, сливки",
      "weight": 2000,
      "calories": 347,
      "picture": "images/strawberry_cake.jpeg",
      "isActive": true
    }
  })
  uniqueProduct: UniqueProduct

  @ApiProperty({
    description: 'amount',
    example: 3
  })
  amount: number;

  constructor(product : UniqueProduct, amount: number) {
    this.uniqueProduct = new UniqueProductDto(product)
    this.amount = amount
  }
}