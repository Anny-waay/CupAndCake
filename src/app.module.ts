import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from "./user/user.module";
import { FavouritesModule } from "./favourites/favourites.module";
import { ShoppingCartModule } from "./shopping-cart/shopping-cart.module";
import { ProductsModule } from "./products/products.module";
import { OrdersModule } from "./orders/orders.module";
import { AuthModule } from "./auth/auth.module";
import * as process from "process";
import { PrismaClientExceptionFilter } from "nestjs-prisma";
import { APP_FILTER, HttpAdapterHost } from "@nestjs/core";
import { AppGatewayModule } from "./gateway/gateway.module";

@Module({
  controllers: [AppController],
  imports: [AuthModule.forRoot({
    connectionURI: process.env.CONNECTION_URI,
    apiKey: process.env.API_KEY,
    appInfo: {
      appName: "Cup&Cake",
      apiDomain: process.env.DOMAIN,
      websiteDomain: process.env.DOMAIN,
      apiBasePath: "/auth",
      websiteBasePath: "/auth",
    },
  }),
    UserModule,
    FavouritesModule,
    ShoppingCartModule,
    ProductsModule,
    OrdersModule,
    AppGatewayModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter);
      },
      inject: [HttpAdapterHost],
    },
    AppService]
})
export class AppModule {}
