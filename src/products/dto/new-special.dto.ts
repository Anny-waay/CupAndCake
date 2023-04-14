import { PaymentType, ProductType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class NewSpecialDto {
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
    description: 'end date for sale',
    example: Date.UTC(2023, 5, 7)
  })
  end_date: Date;

  @ApiProperty({
    description: 'picture of product',
    example: "images/strawberry_cake.jpeg"
  })
  picture: string;
}