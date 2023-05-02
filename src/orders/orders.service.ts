import { Body, Get, Injectable, NotFoundException, NotImplementedException, Param, Post } from "@nestjs/common";
import { OrderDto } from "./dto/order.dto";
import { OrderCreateDto } from "./dto/order.create.dto";
import { OrderStatus } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { ShoppingCartProductDto } from "../shopping-cart/dto/shopping-cart.product.dto";
import { ShoppingCartService } from "../shopping-cart/shopping-cart.service";

@Injectable()
export class OrdersService {

  constructor(private prisma: PrismaService, private shoppingCartService: ShoppingCartService) {}

  async getUserOrders(userId: string): Promise<OrderDto[]> {
    let orders = await this.prisma.shoppingCart.findMany({
      where: {
        user_id: userId,
        NOT:{
          order_id: null
        }
      },
      select: {
        order_id: true,
        order: true
      }
    })

    if (orders == null || orders.length == 0)
      throw new NotFoundException('No orders')
    let result = new Array<OrderDto>();
    for (const order of orders){
      let products = await this.shoppingCartService.getProducts(userId, order.order_id);
      let specials = await this.shoppingCartService.getSpecials(userId, order.order_id);
      let uniques = await this.shoppingCartService.getUniqueProducts(userId, order.order_id);
      result.push(new OrderDto(order.order, products, specials, uniques));
    }
    return result;
  }

  async getAllOrders(): Promise<OrderDto[]> {
    let orders = await this.prisma.order.findMany({
      where: {
          NOT:{
            OR: [
              {
                status: "RECIEVED"
              },
              {
                status: "CANCELED"
              }
            ]
          }
      },
      orderBy: {
        creation_date: "asc"
      },
      include:{
        shopping_cart: true
      }
    })

    if (orders == null || orders.length == 0)
      throw new NotFoundException('No orders')
    let result = new Array<OrderDto>();
    for (const order of orders){
      let products = await this.shoppingCartService.getProducts(order.shopping_cart[0].user_id, order.id);
      let specials = await this.shoppingCartService.getSpecials(order.shopping_cart[0].user_id, order.id);
      let uniques = await this.shoppingCartService.getUniqueProducts(order.shopping_cart[0].user_id, order.id);
      result.push(new OrderDto(order, products, specials, uniques));
    }
    return result;
  }

  async addUserOrder(userId: string, orderDto: OrderCreateDto): Promise<OrderDto> {
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
        user_id: userId,
        order_id: null
      },
      data:{
        order_id: order.id
      }
    })
    let products = await this.shoppingCartService.getProducts(userId, order.id);
    let specials = await this.shoppingCartService.getSpecials(userId, order.id);
    let uniques = await this.shoppingCartService.getUniqueProducts(userId, order.id);
    return new OrderDto(order, products, specials, uniques)
  }

  async getOrders(status: OrderStatus): Promise<OrderDto[]> {
    let orders = await this.prisma.order.findMany({
      where: {
        status: status
      },
      include:{
        shopping_cart: true
      }
    })

    if (orders == null || orders.length == 0)
      throw new NotFoundException('No orders')
    let result = new Array<OrderDto>();
    for (const order of orders){
      let products = await this.shoppingCartService.getProducts(order.shopping_cart[0].user_id, order.id);
      let specials = await this.shoppingCartService.getSpecials(order.shopping_cart[0].user_id, order.id);
      let uniques = await this.shoppingCartService.getUniqueProducts(order.shopping_cart[0].user_id, order.id);
      result.push(new OrderDto(order, products, specials, uniques));
    }
    return result;
  }

  async changeOrderStatus(orderId: string, status: OrderStatus): Promise<OrderDto> {
    let order = await this.prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: status
      },
      include:{
        shopping_cart: true
      }
    })

    let products = await this.shoppingCartService.getProducts(order.shopping_cart[0].user_id, order.id);
    let specials = await this.shoppingCartService.getSpecials(order.shopping_cart[0].user_id, order.id);
    let uniques = await this.shoppingCartService.getUniqueProducts(order.shopping_cart[0].user_id, order.id);
    return new OrderDto(order, products, specials, uniques)
  }
}