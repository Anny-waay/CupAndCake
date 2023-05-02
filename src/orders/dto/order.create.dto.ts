import { DeliveryType, PaymentType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class OrderCreateDto {
  @ApiProperty({
    description: 'payment type',
    example: PaymentType.CREDIT_CARD
  })
  @IsNotEmpty()
  payment: PaymentType;

  @ApiProperty({
    description: 'delivery type',
    example: DeliveryType.COURIER
  })
  @IsNotEmpty()
  delivery: DeliveryType;

  @ApiProperty({
    description: 'address for delivery',
    example: "ул. Ломоносова, д. 20"
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'delivery date and time',
    example: "2023-05-07T18:00:00.000Z"
  })
  @IsNotEmpty()
  @IsDateString()
  deliveryDate: Date;
}