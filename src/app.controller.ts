import { Controller, Get, Post, Render, Req, Res } from "@nestjs/common";
import { AppService } from './app.service';
import Session from "supertokens-node/recipe/session";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return {
      title: 'Cup&Cake',
      isIndex: true
    };
  }

  @Get('/catalog')
  @Render('catalog')
  catalog() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Меню",
      isAllProducts: true
    };
  }

  @Get('/catalog-cakes')
  @Render('catalog')
  catalogCakes() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Торты",
      type: "CAKE"
    };
  }

  @Get('/catalog-bento')
  @Render('catalog')
  catalogBento() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Бенто-торты",
      type: "BENTO"
    };
  }

  @Get('/catalog-cupcakes')
  @Render('catalog')
  catalogCupcakes() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Капкейки",
      type: "CUPCAKE"
    };
  }

  @Get('/catalog-donuts')
  @Render('catalog')
  catalogDonuts() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Пончики",
      type: "DONUT"
    };
  }

  @Get('/catalog-macaroni')
  @Render('catalog')
  catalogMacaroni() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Макарони",
      type: "MACARONI"
    };
  }

  @Get('/catalog-drinks')
  @Render('catalog')
  catalogDrinks() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Напитки",
      type: "DRINK"
    };
  }

  @Get('/account')
  @Render('account')
  async account() {
    return {
      title: 'Личный кабинет',
    };
  }

  @Get('/login')
  @Render('login')
  login() {
    return { title: 'Личный кабинет'};
  }
  @Get('/sign-up')
  @Render('signUp')
  signUp() {
    return { title: 'Личный кабинет'};
  }

  @Get('/constructor')
  @Render('constructor')
  construct() {
    return { title: 'Конструктор десертов' };
  }
}
