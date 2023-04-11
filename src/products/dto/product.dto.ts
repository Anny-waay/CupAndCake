import { ProductType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: ProductType;
  @ApiProperty()
  price: number;
  @ApiProperty()
  picture: string;
}