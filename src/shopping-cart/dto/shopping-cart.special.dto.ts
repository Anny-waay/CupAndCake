import { ApiProperty } from "@nestjs/swagger";
import { Special } from "@prisma/client";
import { ProductDto } from "../../products/dto/product.dto";
import { SpecialDto } from "../../products/dto/special.dto";

export class ShoppingCartSpecialDto {

  @ApiProperty({
    description: 'special',
    example: {
      "id": "c3fba430-f60a-41c5-9430-5275ec392499",
      "name": "Клубничный торт",
      "composition": "яйцо, мука, клубника, сливки",
      "weight": 2000,
      "calories": 347,
      "prevPrice": 3299,
      "newPrice": 1999,
      "picture": "images/strawberry_cake.jpeg",
      "isActive": true
    }
  })
  special: SpecialDto

  @ApiProperty({
    description: 'amount',
    example: 3
  })
  amount: number;

  constructor(special : Special, product : ProductDto, amount : number) {
    this.special = new SpecialDto(special, product)
    this.amount = amount
  }
}