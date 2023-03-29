import { Body, Get, Injectable, NotImplementedException, Param, Post } from "@nestjs/common";
import { Order } from "./interfaces/order.interface";
import { OrderDto } from "./dto/order.dto";
import { OrderFilter } from "./dto/filter.dto";
import { OrderStatus } from "@prisma/client";

@Injectable()
export class OrdersService {

  getUserOrders(userId: string): Promise<Order[]> {
    throw new NotImplementedException();
  }

  addUserOrder(userId: string, orderDto: OrderDto): Promise<Order> {
    throw new NotImplementedException();
  }

  cancelUserOrder(userId: string, orderId: string): Promise<Order> {
    throw new NotImplementedException();
  }

  getOrders(filter?: OrderFilter): Promise<Order[]> {
    throw new NotImplementedException();
  }

  changeOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    throw new NotImplementedException();
  }
}