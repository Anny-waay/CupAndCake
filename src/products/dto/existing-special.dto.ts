import { ApiProperty } from "@nestjs/swagger";

export class ExistingSpecialDto {
  @ApiProperty()
  new_price: number;
  @ApiProperty()
  end_date: Date;
}