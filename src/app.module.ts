import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from "./user/user.module";
import { FavouritesModule } from "./favourites/favourites.module";
import { ShoppingCartModule } from "./shopping-cart/shopping-cart.module";
import { ProductsModule } from "./products/products.module";
import { OrdersModule } from "./orders/orders.module";

@Module({
  controllers: [AppController],
  imports: [UserModule,
    FavouritesModule,
    ShoppingCartModule,
    ProductsModule,
    OrdersModule],
  providers: [AppService]
})
export class AppModule {}
