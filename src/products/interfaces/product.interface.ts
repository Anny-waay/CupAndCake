import { ApiProperty } from "@nestjs/swagger";
import { ProductType } from "@prisma/client";

export class Product {
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
    description: 'picture of product',
    example: "images/strawberry_cake.jpeg"
  })
  picture: string;
}