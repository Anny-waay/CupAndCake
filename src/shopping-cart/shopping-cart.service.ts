import { BadRequestException, Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ShoppingCartProductDto } from "./dto/shopping-cart.product.dto";
import { ShoppingCartSpecialDto } from "./dto/shopping-cart.special.dto";
import { ShoppingCartUniqueDto } from "./dto/shopping-cart.unique.dto";
import { ShoppingCartDto } from "./dto/shopping-cart.dto";

@Injectable()
export class ShoppingCartService {

  constructor(private prisma: PrismaService) {}

  async getShoppingCart(userId: string): Promise<ShoppingCartDto> {
    let products = await this.getProducts(userId, null);
    let specials = await this.getSpecials(userId, null);
    let uniques = await this.getUniqueProducts(userId, null);

    if (products.length == 0 && specials.length == 0 && uniques.length == 0)
      throw new NotFoundException('No products in shopping cart');
    return new ShoppingCartDto(products, specials, uniques)
  }

  async getProducts(userId: string, orderId: string): Promise<ShoppingCartProductDto[]> {
    let products = await this.prisma.shoppingCart.findMany({
      where: {
        user_id: userId,
        order_id: orderId,
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
    let result = new Array<ShoppingCartProductDto>();
    for (const product of products){
      result.push(new ShoppingCartProductDto(product.product, product.amount));
    }
    return result;
  }

  async getSpecials(userId: string, orderId: string): Promise<ShoppingCartSpecialDto[]> {
    let products = await this.prisma.shoppingCart.findMany({
      where: {
        user_id: userId,
        order_id: orderId,
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
    let result = new Array<ShoppingCartSpecialDto>();
    for (const product of products){
      result.push(new ShoppingCartSpecialDto(product.product.special, product.product, product.amount));
    }
    return result;
  }

  async getUniqueProducts(userId: string, orderId: string): Promise<ShoppingCartUniqueDto[]> {
    let products = await this.prisma.shoppingCart.findMany({
      where: {
        user_id: userId,
        order_id: orderId,
        product_id: null
      },
      select:{
        unique_product: true,
        amount: true
      }
    });
    let result = new Array<ShoppingCartUniqueDto>();
    for (const product of products){
      result.push(new ShoppingCartUniqueDto(product.unique_product, product.amount));
    }
    return result;
  }

  async addProduct(userId: string, productId: string): Promise<ShoppingCartProductDto> {
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
      return new ShoppingCartProductDto(product.product, product.amount)
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
      return new ShoppingCartProductDto(product, 1)
    }
  }

  async deleteProduct(userId: string, productId: string) {
    let shoppingCart = await this.prisma.shoppingCart.findFirstOrThrow({
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

  async addUniqueProduct(userId: string, productId: string): Promise<ShoppingCartUniqueDto> {
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
      return new ShoppingCartUniqueDto(product.unique_product, product.amount)
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
      return new ShoppingCartUniqueDto(product, 1)
    }
  }

  async deleteUniqueProduct(userId: string, productId: string) {
    let shoppingCart = await this.prisma.shoppingCart.findFirstOrThrow({
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