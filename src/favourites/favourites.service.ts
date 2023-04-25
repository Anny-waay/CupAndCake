import {
  BadRequestException,
  Injectable, NotFoundException
} from "@nestjs/common";
import { ProductInterface } from "../products/interfaces/product.interface";
import { UniqueProductInterface } from "../products/interfaces/unique-product.interface";
import { PrismaService } from "../prisma.service";
import { SpecialInterface } from "../products/interfaces/special.interface";

@Injectable()
export class FavouritesService {

  constructor(private prisma: PrismaService) {}

  async getProducts(userId: string): Promise<ProductInterface[]> {
    let products = await this.prisma.favourites.findMany({
      where: {
        user_id: userId,
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
        product: true
      }
    });
    if (products == null || products.length == 0)
      throw new NotFoundException('No catalog products in favourites')
    let result = new Array<ProductInterface>();
    for (const product of products){
      result.push(new ProductInterface(product.product));
    }
    return result;
  }

  async getSpecials(userId: string): Promise<SpecialInterface[]> {
    let products = await this.prisma.favourites.findMany({
      where: {
        user_id: userId,
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
        }
      }
    });
    if (products == null || products.length == 0)
      throw new NotFoundException('No catalog products in favourites')
    let result = new Array<SpecialInterface>();
    for (const product of products){
      result.push(new SpecialInterface(product.product.special, product.product));
    }
    return result;
  }

  async addProduct(userId: string, productId: string): Promise<ProductInterface> {
    let favourites = await this.prisma.favourites.findFirst({
      where:{
        user_id: userId,
        product_id: productId
      }
    })
    if (favourites != null)
      throw new BadRequestException('This product is already in favourites')
    let product = await this.prisma.product.findUnique({
      where: {
        id: productId
      }
    });
    if (product == null)
      throw new BadRequestException('Invalid productId')
    await this.prisma.favourites.create({
      data:{
        user_id: userId,
        product_id: productId
      }
      }
    )
    return new ProductInterface(product)
  }

  async deleteProduct(userId: string, productId: string) {
    let favourites = await this.prisma.favourites.findFirst({
      where:{
        user_id: userId,
        product_id: productId
      }
    })
    await this.prisma.favourites.delete({
        where:{
          id: favourites.id
        }
      }
    )
  }

  async getUniqueProducts(userId: string): Promise<UniqueProductInterface[]> {
    let products = await this.prisma.favourites.findMany({
      where: {
        user_id: userId,
        product_id: null
      },
      select:{
        unique_product: true
      }
    });
    if (products == null || products.length == 0)
      throw new NotFoundException('No catalog products in favourites')
    let result = new Array<UniqueProductInterface>();
    for (const product of products){
      result.push(new UniqueProductInterface(product.unique_product));
    }
    return result;
  }

  async addUniqueProduct(userId: string, productId: string): Promise<UniqueProductInterface> {
    let favourites = await this.prisma.favourites.findFirst({
      where:{
        user_id: userId,
        product_id: productId
      }
    })
    if (favourites != null)
      throw new BadRequestException('This product is already in favourites')
    let product = await this.prisma.uniqueProduct.findUnique({
      where: {
        id: productId
      }
    });
    if (product == null)
      throw new BadRequestException('Invalid productId')
    await this.prisma.favourites.create({
        data:{
          user_id: userId,
          unique_product_id: productId
        }
      }
    )
    return new UniqueProductInterface(product)
  }

  async deleteUniqueProduct(userId: string, productId: string) {
    let favourites = await this.prisma.favourites.findFirst({
      where:{
        user_id: userId,
        unique_product_id: productId
      }
    })
    await this.prisma.favourites.delete({
        where:{
          id: favourites.id
        }
      }
    )
  }
}