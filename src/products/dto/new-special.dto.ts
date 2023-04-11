import { ProductType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class NewSpecialDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: ProductType;
  @ApiProperty()
  prev_price: number;
  @ApiProperty()
  new_price: number;
  @ApiProperty()
  end_date: Date;
  @ApiProperty()
  picture: string;
}