import { ApiProperty } from "@nestjs/swagger";
import { PaymentType } from "@prisma/client";
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class ExistingSpecialDto {
  @ApiProperty({
    description: 'new price(sale) for existing product',
    example: 1999
  })
  @IsNotEmpty()
  @IsNumber()
  new_price: number;

  @ApiProperty({
    description: 'end date for sale',
    example: "2023-05-07T18:00:00.000Z"
  })
  @IsNotEmpty()
  @IsDateString()
  end_date: Date;
}