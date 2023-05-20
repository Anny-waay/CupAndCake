import {
  BadRequestException,
  Injectable, NotFoundException
} from "@nestjs/common";
import { ProductDto } from "../products/dto/product.dto";
import { UniqueProductDto } from "../products/dto/unique-product.dto";
import { PrismaService } from "../prisma.service";
import { SpecialDto } from "../products/dto/special.dto";
import { FavouritesDto } from "./dto/favourites.dto";

@Injectable()
export class FavouritesService {

  constructor(private prisma: PrismaService) {}

  async getFavourites(userId: string): Promise<FavouritesDto> {
    let products = await this.getProducts(userId);
    let specials = await this.getSpecials(userId);
    let uniques = await this.getUniqueProducts(userId);

    if (products.length == 0 && specials.length == 0 && uniques.length == 0)
      throw new NotFoundException('No products in favourites.hbs');
    return new FavouritesDto(products, specials, uniques)
  }

  private async getProducts(userId: string): Promise<ProductDto[]> {
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
    let result = new Array<ProductDto>();
    for (const product of products){
      result.push(new ProductDto(product.product));
    }
    return result;
  }

  private async getSpecials(userId: string): Promise<SpecialDto[]> {
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
    let result = new Array<SpecialDto>();
    for (const product of products){
      result.push(new SpecialDto(product.product.special, new ProductDto(product.product)));
    }
    return result;
  }

  private async getUniqueProducts(userId: string): Promise<UniqueProductDto[]> {
    let products = await this.prisma.favourites.findMany({
      where: {
        user_id: userId,
        product_id: null
      },
      select:{
        unique_product: true
      }
    });
    let result = new Array<UniqueProductDto>();
    for (const product of products){
      result.push(new UniqueProductDto(product.unique_product));
    }
    return result;
  }

  async addProduct(userId: string, productId: string): Promise<ProductDto> {
    let favourites = await this.prisma.favourites.findFirst({
      where:{
        user_id: userId,
        product_id: productId
      }
    })
    if (favourites != null)
      throw new BadRequestException('This product is already in favourites.hbs')
    let product = await this.prisma.product.findUniqueOrThrow({
      where: {
        id: productId
      }
    });
    await this.prisma.favourites.create({
      data:{
        user_id: userId,
        product_id: productId
      }
      }
    )
    return new ProductDto(product)
  }

  async deleteProduct(userId: string, productId: string) {
    let favourites = await this.prisma.favourites.findFirstOrThrow({
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

  async addUniqueProduct(userId: string, productId: string): Promise<UniqueProductDto> {
    let favourites = await this.prisma.favourites.findFirst({
      where:{
        user_id: userId,
        product_id: productId
      }
    })
    if (favourites != null)
      throw new BadRequestException('This product is already in favourites.hbs')
    let product = await this.prisma.uniqueProduct.findUniqueOrThrow({
      where: {
        id: productId
      }
    });
    await this.prisma.favourites.create({
        data:{
          user_id: userId,
          unique_product_id: productId
        }
      }
    )
    return new UniqueProductDto(product)
  }

  async deleteUniqueProduct(userId: string, productId: string) {
    let favourites = await this.prisma.favourites.findFirstOrThrow({
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