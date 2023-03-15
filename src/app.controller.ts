import { Controller, Get, Post, Render, UseInterceptors } from "@nestjs/common";
import { AppService } from './app.service';
import {TimeLoadingInterceptor } from "./time.loading.interceptor";

@UseInterceptors(TimeLoadingInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return {
      title: 'Cup&Cake',
      isIndex: true,
      specialOffers: [
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
      ]
    };
  }

  @Get('/catalog')
  @Render('catalog')
  catalog() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Меню",
      products: [
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
      ]
    };
  }

  @Get('/catalog-cakes')
  @Render('catalog')
  catalogCakes() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Торты",
      products: [
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
      ]
    };
  }

  @Get('/catalog-bento')
  @Render('catalog')
  catalogBento() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Бенто-торты"
    };
  }

  @Get('/catalog-cupcakes')
  @Render('catalog')
  catalogCupcakes() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Капкейки"
    };
  }

  @Get('/catalog-donuts')
  @Render('catalog')
  catalogDonuts() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Пончики"
    };
  }

  @Get('/catalog-macaroni')
  @Render('catalog')
  catalogMacaroni() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Макарони"
    };
  }

  @Get('/catalog-drinks')
  @Render('catalog')
  catalogDrinks() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Напитки"
    };
  }

  @Get('/account')
  @Render('account')
  account() {
    return { title: 'Личный кабинет'};
  }

  @Post('/login')
  @Render('account')
  login() {
    return {
      title: 'Личный кабинет',
      isAuthorized: true};
  }

  @Get('/constructor')
  @Render('constructor')
  construct() {
    return { title: 'Конструктор десертов'};
  }
}
