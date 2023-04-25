import { Body, Get, Injectable, NotFoundException, NotImplementedException, Param, Post } from "@nestjs/common";
import { OrderInterface } from "./interfaces/order.interface";
import { OrderDto } from "./dto/order.dto";
import { OrderStatus } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { ShoppingCartProductInterface } from "../shopping-cart/interfaces/shopping-cart.product.interface";

@Injectable()
export class OrdersService {

  constructor(private prisma: PrismaService) {}

  async getUserOrders(userId: string): Promise<OrderInterface[]> {
    let orders = await this.prisma.shoppingCart.findMany({
      where: {
        user_id: userId,
        NOT:{
          order_id: null
        }
      },
      select: {
        order: true
      }
    })

    if (orders == null || orders.length == 0)
      throw new NotFoundException('No orders')
    let result = new Array<OrderInterface>();
    for (const order of orders){
      result.push(new OrderInterface(order.order));
    }
    return result;
  }

  async addUserOrder(userId: string, orderDto: OrderDto): Promise<OrderInterface> {
    let order = await this.prisma.order.create({
      data:{
        status: OrderStatus.CREATED,
        payment: orderDto.payment,
        delivery: orderDto.delivery,
        devivery_date: orderDto.deliveryDate,
        address: orderDto.address
      }
    })
    await this.prisma.shoppingCart.updateMany({
      where:{
        order_id: null
      },
      data:{
        order_id: order.id
      }
    })
    return new OrderInterface(order)
  }

  async getOrders(status: OrderStatus): Promise<OrderInterface[]> {
    let orders = await this.prisma.order.findMany({
      where: {
        status: status
      }
    })

    if (orders == null || orders.length == 0)
      throw new NotFoundException('No orders')
    let result = new Array<OrderInterface>();
    for (const order of orders){
      result.push(new OrderInterface(order));
    }
    return result;
  }

  async changeOrderStatus(orderId: string, status: OrderStatus): Promise<OrderInterface> {
    let order = await this.prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: status
      }
    })

    if (order == null)
      throw new NotFoundException('Invalid orderId')

    return new OrderInterface(order);
  }
}