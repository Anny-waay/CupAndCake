import { Biscuit, Cream, Filling, ProductType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class UniqueProductDto{
  @ApiProperty()
  type: ProductType;
  @ApiProperty()
  biscuit: Biscuit;
  @ApiProperty()
  cream: Cream;
  @ApiProperty()
  filling: Filling;
  @ApiProperty()
  design: string;
  @ApiProperty()
  picture: string;
}