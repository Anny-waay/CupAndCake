import { ApiProperty } from "@nestjs/swagger";

export class Special {
  @ApiProperty({
    description: 'product name',
    example: "Клубничный торт"
  })
  name: string;

  @ApiProperty({
    description: 'usual price',
    example: 3299
  })
  prev_price: number;

  @ApiProperty({
    description: 'new price(sale)',
    example: 1999
  })
  new_price: number;

  @ApiProperty({
    description: 'picture of product',
    example: "images/strawberry_cake.jpeg"
  })
  picture: string;
}