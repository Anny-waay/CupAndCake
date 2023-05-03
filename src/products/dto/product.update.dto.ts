import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductUpdateDto{
  @ApiProperty({
    description: 'price',
    example: 3299
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'picture of product',
    example: "images/strawberry_cake.jpeg"
  })
  picture: string;

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
}