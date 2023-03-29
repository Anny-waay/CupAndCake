import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { Order } from "./interfaces/order.interface";
import { OrderFilter } from "./dto/filter.dto";
import { OrderDto } from "./dto/order.dto";
import { OrderStatus } from "@prisma/client";

@ApiTags('orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService : OrdersService) {}
  @Get(':user_id')
  getUserOrders(@Param('user_id') userId: string): Promise<Order[]> {
    return this.ordersService.getUserOrders(userId);
  }

  @Post(':user_id')
  addUserOrder(@Param('user_id') userId: string, @Body() orderDto: OrderDto): Promise<Order> {
    return this.ordersService.addUserOrder(userId, orderDto);
  }

  @Post(':user_id/cancel')
  cancelUserOrder(@Param('user_id') userId: string, @Body() orderId: string): Promise<Order> {
    return this.ordersService.cancelUserOrder(userId, orderId);
  }

  @Get()
  getOrders(@Body() filter?: OrderFilter): Promise<Order[]> {
    return this.ordersService.getOrders(filter);
  }

  @Post(':order_id/change_status')
  changeOrderStatus(@Param('order_id') orderId: string, @Body() status: OrderStatus): Promise<Order> {
    return this.ordersService.changeOrderStatus(orderId, status);
  }
}