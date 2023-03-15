import { Controller, Get, Post, Render } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return {
      title: 'Cup&Cake',
      isIndex: true,
      specialOffers: this.appService.getSpecials()
    };
  }

  @Get('/catalog')
  @Render('catalog')
  catalog() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Меню",
      products: this.appService.getProducts()
    };
  }

  @Get('/catalog-cakes')
  @Render('catalog')
  catalogCakes() {
    return {
      title: 'Каталог',
      isCatalog: true,
      catalog: "Торты",
      products: this.appService.getProducts()
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
