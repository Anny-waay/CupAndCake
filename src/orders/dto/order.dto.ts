import { ProductDto } from "../../products/dto/product.dto";
import { DeliveryType, Order, OrderStatus, PaymentType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { ShoppingCartSpecialDto } from "../../shopping-cart/dto/shopping-cart.special.dto";
import { ShoppingCartProductDto } from "../../shopping-cart/dto/shopping-cart.product.dto";
import { ShoppingCartUniqueDto } from "../../shopping-cart/dto/shopping-cart.unique.dto";

export class OrderDto {

  @ApiProperty({
    description: 'product id',
    example: "c3fba430-f60a-41c5-9430-5275ec392499"
  })
  id: string;

  @ApiProperty({
    description: 'creation date and time',
    example: "2023-05-01T18:00:00.000Z"
  })
  creationDate: Date;

  @ApiProperty({
    description: 'payment type',
    example: PaymentType.CREDIT_CARD
  })
  payment: PaymentType;

  @ApiProperty({
    description: 'delivery type',
    example: DeliveryType.COURIER
  })
  delivery: DeliveryType;

  @ApiProperty({
    description: 'address for delivery',
    example: "ул. Ломоносова, д. 20"
  })
  address: string;

  @ApiProperty({
    description: 'delivery date and time',
    example: "2023-05-07T18:00:00.000Z"
  })
  deliveryDate: Date;

  @ApiProperty({
    description: 'special products in shopping cart',
    example: [
      {
        "special": {
          "id": "c3fba430-f60a-41c5-9430-5275ec392499",
          "name": "Клубничный торт",
          "composition": "яйцо, мука, клубника, сливки",
          "weight": 2000,
          "calories": 347,
          "prevPrice": 3299,
          "newPrice": 1999,
          "picture": "images/strawberry_cake.jpeg",
          "isActive": true
        },
        "amount": 3
      }
    ]
  })
  specialProduct: ShoppingCartSpecialDto[]

  @ApiProperty({
    description: 'catalog products in shopping cart',
    example: [
      {
        "product": {
          "id": "c3fba430-f60a-41c5-9430-5275ec392499",
          "name": "Клубничный торт",
          "composition": "яйцо, мука, клубника, сливки",
          "weight": 2000,
          "calories": 347,
          "prevPrice": 3299,
          "newPrice": 1999,
          "picture": "images/strawberry_cake.jpeg",
          "isActive": true
        },
        "amount": 3
      }
    ]
  })
  catalogProduct: ShoppingCartProductDto[]

  @ApiProperty({
    description: 'unique products in shopping cart',
    example: [
      {
        "uniqueProduct": {
          "id": "c3fba430-f60a-41c5-9430-5275ec392499",
          "name": "Клубничный торт",
          "price": 3299,
          "composition": "яйцо, мука, клубника, сливки",
          "weight": 2000,
          "calories": 347,
          "picture": "images/strawberry_cake.jpeg",
          "isActive": true
        },
        "amount": 1
      }
    ]
  })
  uniqueProduct: ShoppingCartUniqueDto[]
  constructor(order: Order, products: ShoppingCartProductDto[], specials: ShoppingCartSpecialDto[],  uniques: ShoppingCartUniqueDto[]) {
    this.id = order.id
    this.creationDate = order.creation_date
    this.payment = order.payment
    this.delivery = order.delivery
    this.address = order.address
    this.deliveryDate = order.devivery_date
    this.catalogProduct = products
    this.specialProduct = specials
    this.uniqueProduct = uniques
  }
}