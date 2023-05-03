import { ApiProperty } from "@nestjs/swagger";
import { Product } from "@prisma/client";

export class ProductDto {
  @ApiProperty({
    description: 'product id',
    example: "c3fba430-f60a-41c5-9430-5275ec392499"
  })
  id: string;

  @ApiProperty({
    description: 'product name',
    example: "Клубничный торт"
  })
  name: string;

  @ApiProperty({
    description: 'price',
    example: 3299
  })
  price: number;

  @ApiProperty({
    description: 'composition of the product',
    example: 'яйцо, мука, клубника, сливки'
  })
  composition: string;

  @ApiProperty({
    description: 'weight of the product',
    example: 2000
  })
  weight: number;

  @ApiProperty({
    description: 'calories',
    example: 347
  })
  calories: number;

  @ApiProperty({
    description: 'picture of product',
    example: "images/strawberry_cake.jpeg"
  })
  picture: string;

  @ApiProperty({
    description: 'availability of the product',
    example: true
  })
  isActive: boolean;

  constructor(product : Product) {
    this.id = product.id
    this.name = product.name
    this.composition = product.composition
    this.weight = product.weight
    this.calories = product.calories
    this.price = product.price
    this.picture = product.picture
    this.isActive = product.isActive
  }
}