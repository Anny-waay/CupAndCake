import { Biscuit, Cream, Filling, ProductType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UniqueProductDto{
  @ApiProperty({
    description: 'type of product',
    example: ProductType.CAKE
  })
  @IsNotEmpty()
  type: ProductType;

  @ApiProperty({
    description: 'type of biscuit',
    example: Biscuit.VANILLA
  })
  @IsNotEmpty()
  biscuit: Biscuit;

  @ApiProperty({
    description: 'type of cream',
    example: Cream.CHOCOLATE
  })
  @IsNotEmpty()
  cream: Cream;

  @ApiProperty({
    description: 'type of filling',
    example: Filling.STRAWBERRY
  })
  @IsNotEmpty()
  filling: Filling;

  @ApiProperty({
    description: 'design description',
    example: "хочу торт с бэтменом"
  })
  @IsNotEmpty()
  @IsString()
  design: string;

  @ApiProperty({
    description: 'composition of the product',
    example: 'яйцо, мука, клубника, сливки'
  })
  @IsNotEmpty()
  @IsString()
  composition: string;

  @ApiProperty({
    description: 'weight of the product',
    example: 2000
  })
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty({
    description: 'calories',
    example: 347
  })
  @IsNotEmpty()
  @IsNumber()
  calories: number;

  @ApiProperty({
    description: 'price',
    example: 3299
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'design picture',
    example: "images/batman_cake.jpeg"
  })
  @IsNotEmpty()
  @IsString()
  picture: string;
}