import { Product } from "../../products/interfaces/product.interface";
import { DeliveryType, OrderStatus, PaymentType } from "@prisma/client";

export interface Order {
  creation_date: Date;
  status: OrderStatus;
  payment: PaymentType;
  delivery: DeliveryType;
  address: string;
  devivery_date: Date;
  products: Product[];
}