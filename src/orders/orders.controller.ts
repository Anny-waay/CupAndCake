import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse, ApiCookieAuth,
  ApiCreatedResponse, ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { OrderDto } from "./dto/order.dto";
import { OrderCreateDto } from "./dto/order.create.dto";
import { OrderStatus } from "@prisma/client";
import { AuthGuard } from "../auth/auth.guard";
import { SessionClaimValidator } from "supertokens-node/lib/build/recipe/session";
import UserRoles from "supertokens-node/recipe/userroles";
import { Session } from "../auth/session.decorator";

@ApiTags('orders')
@Controller('api/')
export class OrdersController {
  constructor(private readonly ordersService : OrdersService) {}
  @ApiOkResponse({description: 'Orders was successfully received.', type: [OrderDto]})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For customer use only.'})
  @Get('customer/orders')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('customer'),
    ],
  }))
  @ApiCookieAuth()
  getUserOrders(@Session() session): Promise<OrderDto[]> {
    const userId = session.userId;
    return this.ordersService.getUserOrders(userId);
  }

  @ApiOkResponse({description: 'Orders was successfully received.', type: [OrderDto]})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For manager use only.'})
  @Get('orders')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('manager'),
    ],
  }))
  @ApiCookieAuth()
  getAllOrders(): Promise<OrderDto[]> {
    return this.ordersService.getAllOrders();
  }

  @ApiOkResponse({description: 'Orders was successfully received.', type: [OrderDto]})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For manager use only.'})
  @Get('orders/:status')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('manager'),
    ],
  }))
  @ApiCookieAuth()
  getOrders(@Query('status') status: OrderStatus): Promise<OrderDto[]> {
    return this.ordersService.getOrders(status);
  }

  @ApiCreatedResponse({description: 'Order was successfully created.', type: OrderDto})
  @ApiBadRequestResponse({description: 'Invalid order data.'})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @ApiForbiddenResponse({description: 'For customer use only.'})
  @Post('orders')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (
      globalValidators: SessionClaimValidator[],
    ) => [
      ...globalValidators,
      UserRoles.UserRoleClaim.validators.includes('customer'),
    ],
  }))
  @ApiCookieAuth()
  addUserOrder(@Session() session, @Body() orderDto: OrderCreateDto): Promise<OrderDto> {
    const userId = session.userId;
    return this.ordersService.addUserOrder(userId, orderDto);
  }

  @ApiOkResponse({description: 'Order status was successfully changed.', type: OrderDto})
  @ApiBadRequestResponse({description: 'Invalid order.'})
  @Post('orders/:orderId/change-status')
  changeOrderStatus(@Param('orderId', ParseUUIDPipe) orderId: string, @Query('status') status: OrderStatus): Promise<OrderDto> {
    return this.ordersService.changeOrderStatus(orderId, status);
  }
}