import { ProductType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
  @ApiProperty({
    description: 'product name',
    example: "Клубничный торт"
  })
  name: string;

  @ApiProperty({
    description: 'type of product',
    example: ProductType.CAKE
  })
  type: ProductType;

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