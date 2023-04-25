import { ProductInterface } from "../../products/interfaces/product.interface";
import { DeliveryType, Order, OrderStatus, PaymentType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class OrderInterface {

  @ApiProperty({
    description: 'product id',
    example: "c3fba430-f60a-41c5-9430-5275ec392499"
  })
  id: string;

  @ApiProperty({
    description: 'creation date and time',
    example: Date.UTC(2023, 4, 15, 15, 20)
  })
  creationDate: Date;

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

  constructor(order: Order) {
    this.id = order.id
    this.creationDate = order.creation_date
    this.payment = order.payment
    this.delivery = order.delivery
    this.address = order.address
    this.deliveryDate = order.devivery_date
  }
}