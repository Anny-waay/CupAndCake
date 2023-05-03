import { ApiProperty } from "@nestjs/swagger";
import { Product } from "@prisma/client";
import { ProductDto } from "../../products/dto/product.dto";

export class ShoppingCartProductDto {
  @ApiProperty({
    description: 'product',
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
  product: ProductDto

  @ApiProperty({
    description: 'amount',
    example: 3
  })
  amount: number;

  constructor(product : Product, amount: number) {
    this.product = new ProductDto(product)
    this.amount = amount
  }
}