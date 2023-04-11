import { DeliveryType, PaymentType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class OrderDto {
  @ApiProperty()
  payment: PaymentType;
  @ApiProperty()
  delivery: DeliveryType;
  @ApiProperty()
  address: string;
  @ApiProperty()
  deliveryDate: Date;
}