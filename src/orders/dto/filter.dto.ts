import { OrderStatus } from "@prisma/client";

export class OrderFilter {
    status: OrderStatus;
    creationDate: Date;
}