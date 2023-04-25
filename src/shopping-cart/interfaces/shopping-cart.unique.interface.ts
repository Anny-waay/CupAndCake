import { ApiProperty } from "@nestjs/swagger";
import { Biscuit, Cream, Filling, ProductType, UniqueProduct } from "@prisma/client";

export class ShoppingCartUniqueInterface{
  @ApiProperty({
    description: 'product id',
    example: "c3fba430-f60a-41c5-9430-5275ec392499"
  })
  id: string;

  @ApiProperty({
    description: 'type of product',
    example: ProductType.CAKE
  })
  type: ProductType;

  @ApiProperty({
    description: 'type of biscuit',
    example: Biscuit.VANILLA
  })
  biscuit: Biscuit;

  @ApiProperty({
    description: 'type of cream',
    example: Cream.CHOCOLATE
  })
  cream: Cream;

  @ApiProperty({
    description: 'type of filling',
    example: Filling.STRAWBERRY
  })
  filling: Filling;

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
    description: 'design description',
    example: "хочу торт с бэтменом"
  })
  design: string;

  @ApiProperty({
    description: 'design picture',
    example: "images/batman_cake.jpeg"
  })
  picture: string;

  @ApiProperty({
    description: 'price',
    example: 3299
  })
  price: number;

  @ApiProperty({
    description: 'amount',
    example: 3
  })
  amount: number;

  constructor(product : UniqueProduct, amount: number) {
    this.id = product.id
    this.type = product.type
    this.biscuit = product.biscuit
    this.cream = product.cream
    this.filling = product.filling
    this.composition = product.composition
    this.weight = product.weight
    this.calories = product.calories
    this.design = product.design
    this.price = product.price
    this.picture = product.picture
    this.amount = amount
  }
}