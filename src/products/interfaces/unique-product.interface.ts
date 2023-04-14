import { Biscuit, Cream, Filling, ProductType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class UniqueProduct{
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
    description: 'design description',
    example: "хочу торт с бэтменом"
  })
  design: string;

  @ApiProperty({
    description: 'design picture',
    example: "images/batman_cake.jpeg"
  })
  picture: string;
}