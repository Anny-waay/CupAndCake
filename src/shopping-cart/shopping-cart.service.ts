import { BadRequestException, Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { ProductInterface } from "../products/interfaces/product.interface";
import { UniqueProductInterface } from "../products/interfaces/unique-product.interface";
import { PrismaService } from "../prisma.service";
import { SpecialInterface } from "../products/interfaces/special.interface";
import { ShoppingCartProductInterface } from "./interfaces/shopping-cart.product.interface";
import { ShoppingCartSpecialInterface } from "./interfaces/shopping-cart.special.interface";
import { ShoppingCartUniqueInterface } from "./interfaces/shopping-cart.unique.interface";

@Injectable()
export class ShoppingCartService {

  constructor(private prisma: PrismaService) {}

  async getProducts(userId: string): Promise<ShoppingCartProductInterface[]> {
    let products = await this.prisma.shoppingCart.findMany({
      where: {
        user_id: userId,
        order_id: null,
        unique_product_id: null,
        product:{
          OR: [
            {
              special: null
            },
            {
              special: {
                end_date: {
                  lte: new Date(Date.now())
                }
              }
            }
          ]
        }
      },
      select:{
        product: true,
        amount: true
      }
    });
    if (products == null || products.length == 0)
      throw new NotFoundException('No catalog products in favourites')
    let result = new Array<ShoppingCartProductInterface>();
    for (const product of products){
      result.push(new ShoppingCartProductInterface(product.product, product.amount));
    }
    return result;
  }

  async getSpecials(userId: string): Promise<ShoppingCartSpecialInterface[]> {
    let products = await this.prisma.shoppingCart.findMany({
      where: {
        user_id: userId,
        order_id: null,
        unique_product_id: null,
        product:{
          NOT: {
            OR: [
              {
                special: null
              },
              {
                special: {
                  end_date: {
                    lte: new Date(Date.now())
                  }
                }
              }
            ]
          }
        }
      },
      select:{
        product: {
          include: {
            special: true
          }
        },
        amount: true
      }
    });
    if (products == null || products.length == 0)
      throw new NotFoundException('No catalog products in favourites')
    let result = new Array<ShoppingCartSpecialInterface>();
    for (const product of products){
      result.push(new ShoppingCartSpecialInterface(product.product.special, product.product, product.amount));
    }
    return result;
  }

  async addProduct(userId: string, productId: string): Promise<ShoppingCartProductInterface> {
    let shoppingCart = await this.prisma.shoppingCart.findFirst({
      where:{
        user_id: userId,
        product_id: productId
      }
    })
    if (shoppingCart != null){
      let product = await this.prisma.shoppingCart.update({
        where:{
          id: shoppingCart.id
        },
        data:{
          amount: shoppingCart.amount + 1
        },
        select:{
          product: true,
          amount: true
        }
      })
      return new ShoppingCartProductInterface(product.product, product.amount)
    }
    else{
      let product = await this.prisma.product.findUnique({
        where: {
          id: productId
        }
      });
      if (product == null)
        throw new BadRequestException('Invalid productId')
      await this.prisma.shoppingCart.create({
          data:{
            user_id: userId,
            product_id: productId
          }
        }
      )
      return new ShoppingCartProductInterface(product, 1)
    }
  }

  async deleteProduct(userId: string, productId: string) {
    let shoppingCart = await this.prisma.shoppingCart.findFirst({
      where:{
        user_id: userId,
        product_id: productId
      }
    })
    if (shoppingCart.amount > 1)
      await this.prisma.shoppingCart.update({
        where:{
          id: shoppingCart.id
        },
        data:{
          amount: shoppingCart.amount - 1
        }
      })
    else
      await this.prisma.shoppingCart.delete({
          where:{
            id: shoppingCart.id
          }
        }
      )
  }

  async getUniqueProducts(userId: string): Promise<ShoppingCartUniqueInterface[]> {
    let products = await this.prisma.shoppingCart.findMany({
      where: {
        user_id: userId,
        order_id: null,
        product_id: null
      },
      select:{
        unique_product: true,
        amount: true
      }
    });
    if (products == null || products.length == 0)
      throw new NotFoundException('No catalog products in favourites')
    let result = new Array<ShoppingCartUniqueInterface>();
    for (const product of products){
      result.push(new ShoppingCartUniqueInterface(product.unique_product, product.amount));
    }
    return result;
  }

  async addUniqueProduct(userId: string, productId: string): Promise<ShoppingCartUniqueInterface> {
    let shoppingCart = await this.prisma.shoppingCart.findFirst({
      where:{
        user_id: userId,
        unique_product_id: productId
      }
    })
    if (shoppingCart != null){
      let product = await this.prisma.shoppingCart.update({
        where:{
          id: shoppingCart.id
        },
        data:{
          amount: shoppingCart.amount + 1
        },
        select:{
          unique_product: true,
          amount: true
        }
      })
      return new ShoppingCartUniqueInterface(product.unique_product, product.amount)
    }
    else{
      let product = await this.prisma.uniqueProduct.findUnique({
        where: {
          id: productId
        }
      });
      if (product == null)
        throw new BadRequestException('Invalid productId')
      await this.prisma.shoppingCart.create({
          data:{
            user_id: userId,
            unique_product_id: productId
          }
        }
      )
      return new ShoppingCartUniqueInterface(product, 1)
    }
  }

  async deleteUniqueProduct(userId: string, productId: string) {
    let shoppingCart = await this.prisma.shoppingCart.findFirst({
      where:{
        user_id: userId,
        unique_product_id: productId
      }
    })
    if (shoppingCart.amount > 1)
      await this.prisma.shoppingCart.update({
        where:{
          id: shoppingCart.id
        },
        data:{
          amount: shoppingCart.amount - 1
        }
      })
    else
      await this.prisma.shoppingCart.delete({
          where:{
            id: shoppingCart.id
          }
        }
      )
  }
}