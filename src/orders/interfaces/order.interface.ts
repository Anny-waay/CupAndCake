import { Product } from "../../products/interfaces/product.interface";
import { DeliveryType, OrderStatus, PaymentType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class Order {
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
  delivery_date: Date;

  products: Product[];
}