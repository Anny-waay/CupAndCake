import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSpecials(): object[] {
    return [
      {
        image:"images/coffee_cake.jpeg",
        product:"Кофе арабика + торт \"Лесные ягоды\"",
        prevPrice: 3000,
        actualPrice: 1999
      },
      {
        image:"images/cupcakes_helloween.jpeg",
        product:"Капкейки Хэллоуин",
        prevPrice: 2000,
        actualPrice: 1499
      },
      {
        image:"images/tea_cake.jpg",
        product:"Чай \"Эрл Грей\" + Лимонный тарт",
        prevPrice: 2500,
        actualPrice: 1799
      }
    ];
  }

  getProducts(): object[] {
    return [
      {
        image:"images/cake-chocolate.jpeg",
        product:"Шоколадный торт",
        price: 2899
      },
      {
        image:"images/cake-strawberry.jpeg",
        product:"Клубничный торт",
        price: 2799
      },
      {
        image:"images/cake-honey.jpeg",
        product:"Медовик",
        price: 2999
      },
      {
        image:"images/cake-berries.jpeg",
        product:"Ежевичный торт",
        price: 2899
      },
      {
        image:"images/cake-caramel.jpeg",
        product:"Торт \"Соленая карамель\"",
        price: 3199
      },
      {
        image:"images/cake-red-velvet.jpeg",
        product:"Красный бархат",
        price: 2999
      },
      {
        image:"images/cake-limon.jpeg",
        product:"Лимонный торт",
        price: 2699
      }
    ];
  }
}
