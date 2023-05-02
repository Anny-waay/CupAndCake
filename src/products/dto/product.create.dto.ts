import { ProductType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductCreateDto {
  @ApiProperty({
    description: 'product name',
    example: "Клубничный торт"
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'type of product',
    example: ProductType.CAKE
  })
  @IsNotEmpty()
  type: ProductType;

  @ApiProperty({
    description: 'price',
    example: 3299
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

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
    description: 'picture of product',
    example: "images/strawberry_cake.jpeg"
  })
  @IsNotEmpty()
  @IsString()
  picture: string;
}