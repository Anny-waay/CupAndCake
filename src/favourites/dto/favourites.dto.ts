import { ApiProperty } from "@nestjs/swagger";
import { ProductDto } from "../../products/dto/product.dto";
import { SpecialDto } from "../../products/dto/special.dto";
import { UniqueProductDto } from "../../products/dto/unique-product.dto";

export class FavouritesDto{
  @ApiProperty({
    description: 'catalog products in shopping cart',
    example: [
      {
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
    ]
  })
  specialProduct: SpecialDto[]

  @ApiProperty({
    description: 'special products in favourites',
    example: [
      {
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
    ]
  })
  catalogProduct: ProductDto[]

  @ApiProperty({
    description: 'unique products in favourites',
    example: [
      {
        "id": "c3fba430-f60a-41c5-9430-5275ec392499",
        "name": "Клубничный торт",
        "price": 3299,
        "composition": "яйцо, мука, клубника, сливки",
        "weight": 2000,
        "calories": 347,
        "picture": "images/strawberry_cake.jpeg",
        "isActive": true
      }
    ]
  })
  uniqueProduct: UniqueProductDto[]

  constructor(products: ProductDto[], specials: SpecialDto[],  uniques: UniqueProductDto[]) {
    this.catalogProduct = products
    this.specialProduct = specials
    this.uniqueProduct = uniques
  }
}