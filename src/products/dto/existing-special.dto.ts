import { ApiProperty } from "@nestjs/swagger";
import { PaymentType } from "@prisma/client";

export class ExistingSpecialDto {
  @ApiProperty({
    description: 'new price(sale) for existing product',
    example: 1999
  })
  new_price: number;

  @ApiProperty({
    description: 'end date for sale',
    example: Date.UTC(2023, 5, 7)
  })
  end_date: Date;
}