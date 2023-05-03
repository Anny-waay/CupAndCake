import { ApiProperty } from "@nestjs/swagger";
import { ShoppingCartProductDto } from "./shopping-cart.product.dto";
import { ShoppingCartUniqueDto } from "./shopping-cart.unique.dto";
import { ShoppingCartSpecialDto } from "./shopping-cart.special.dto";

export class ShoppingCartDto {
  @ApiProperty({
    description: 'special products in shopping cart',
    example: [
      {
        "special": {
          "id": "c3fba430-f60a-41c5-9430-5275ec392499",
          "name": "Клубничный торт",
          "composition": "яйцо, мука, клубника, сливки",
          "weight": 2000,
          "calories": 347,
          "prevPrice": 3299,
          "newPrice": 1999,
          "picture": "images/strawberry_cake.jpeg",
          "isActive": true
        },
        "amount": 3
      }
    ]
  })
  specialProduct: ShoppingCartSpecialDto[]

  @ApiProperty({
    description: 'catalog products in shopping cart',
    example: [
      {
        "product": {
          "id": "c3fba430-f60a-41c5-9430-5275ec392499",
          "name": "Клубничный торт",
          "composition": "яйцо, мука, клубника, сливки",
          "weight": 2000,
          "calories": 347,
          "prevPrice": 3299,
          "newPrice": 1999,
          "picture": "images/strawberry_cake.jpeg",
          "isActive": true
        },
        "amount": 3
      }
    ]
  })
  catalogProduct: ShoppingCartProductDto[]

  @ApiProperty({
    description: 'unique products in shopping cart',
    example: [
      {
        "uniqueProduct": {
          "id": "c3fba430-f60a-41c5-9430-5275ec392499",
          "name": "Клубничный торт",
          "price": 3299,
          "composition": "яйцо, мука, клубника, сливки",
          "weight": 2000,
          "calories": 347,
          "picture": "images/strawberry_cake.jpeg",
          "isActive": true
        },
        "amount": 1
      }
    ]
  })
  uniqueProduct: ShoppingCartUniqueDto[]

  constructor(products: ShoppingCartProductDto[], specials: ShoppingCartSpecialDto[],  uniques: ShoppingCartUniqueDto[]) {
    this.catalogProduct = products
    this.specialProduct = specials
    this.uniqueProduct = uniques
  }
}