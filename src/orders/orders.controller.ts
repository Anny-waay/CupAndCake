import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { Order } from "./interfaces/order.interface";
import { OrderDto } from "./dto/order.dto";
import { OrderStatus } from "@prisma/client";

@ApiTags('orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService : OrdersService) {}
  @ApiOkResponse({description: 'Orders was successfully received.', type: [Order]})
  @Get()
  getUserOrders(@Param('userId') userId: string): Promise<Order[]> {
    return this.ordersService.getUserOrders(userId);
  }

  @ApiOkResponse({description: 'Orders was successfully received.', type: [Order]})
  @Get(':status')
  getOrders(@Param('status') status: OrderStatus): Promise<Order[]> {
    return this.ordersService.getOrders(status);
  }

  @ApiCreatedResponse({description: 'Order was successfully created.', type: Order})
  @ApiBadRequestResponse({description: 'Invalid order data.'})
  @Post()
  addUserOrder(@Param('userId') userId: string, @Body() orderDto: OrderDto): Promise<Order> {
    return this.ordersService.addUserOrder(userId, orderDto);
  }

  @ApiOkResponse({description: 'Order status was successfully changed.', type: Order})
  @ApiBadRequestResponse({description: 'Invalid order.'})
  @Post(':orderId/change-status')
  changeOrderStatus(@Param('orderId') orderId: string, @Param() status: OrderStatus): Promise<Order> {
    return this.ordersService.changeOrderStatus(orderId, status);
  }
}