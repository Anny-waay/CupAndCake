import { DeliveryType, PaymentType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class OrderDto {
  @ApiProperty({
    description: 'payment type',
    example: PaymentType.CREDIT_CARD
  })
  payment: PaymentType;

  @ApiProperty({
    description: 'delivery type',
    example: DeliveryType.COURIER
  })
  delivery: DeliveryType;

  @ApiProperty({
    description: 'address for delivery',
    example: "ул. Ломоносова, д. 20"
  })
  address: string;

  @ApiProperty({
    description: 'delivery date and time',
    example: Date.UTC(2023, 4, 15, 15, 20)
  })
  deliveryDate: Date;
}