import { DeliveryType, PaymentType } from "@prisma/client";

export class OrderDto {
  payment: PaymentType;
  delivery: DeliveryType;
  address: string;
  devivery_date: Date;
}