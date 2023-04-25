import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductInterface } from "./interfaces/product.interface";
import { ProductDto } from "./dto/product.dto";
import { NewSpecialDto } from "./dto/new-special.dto";
import { SpecialInterface } from "./interfaces/special.interface";
import { ExistingSpecialDto } from "./dto/existing-special.dto";
import { ProductType } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { ProductUpdateDto } from "./dto/product.update.dto";
import { UniqueProductInterface } from "./interfaces/unique-product.interface";
import { UniqueProductDto } from "./dto/unique-product.dto";

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) {}

  async getCatalog(page: number, limit: number): Promise<ProductInterface[]>{
    let catalog = await this.prisma.product.findMany({
      skip: (Number(page)-1) * Number(limit),
      take: Number(limit),
      where: {
        isActive: true,
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
    });
    if (catalog.length == 0)
      throw new NotFoundException('No products in catalog');

    let result = new Array<ProductInterface>();
    for (const product of catalog){
      result.push(new ProductInterface(product));
    }
    return result;
  }

  async getCatalogType(type: ProductType, page: number, limit: number): Promise<ProductInterface[]>{
    let catalog = await this.prisma.product.findMany({
      skip: (Number(page)-1) * Number(limit),
      take: Number(limit),
      where: {
        isActive: true,
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
        ],
        type: type
      }
    });
    if (catalog.length == 0)
      throw new NotFoundException('No products in catalog');

    let result = new Array<ProductInterface>();
    for (const product of catalog){
      result.push(new ProductInterface(product));
    }
    return result;
  }

  async search(request: string): Promise<ProductInterface[]>{
    let products = await this.prisma.product.findMany({
      where: {
        special: null,
        name: {
          contains: request,
        }
      }
    });
    if (products.length == 0)
      throw new NotFoundException('Products not found');

    let result = new Array<ProductInterface>();
    for (const product of products){
      result.push(new ProductInterface(product));
    }
    return result;
  }

  async addProduct(productDto: ProductDto): Promise<ProductInterface>{
    let product = await this.prisma.product.findUnique({
      where: {
        name : productDto.name
      }
    },)
    if (product != null){
      if (product.isActive)
        throw new BadRequestException('Product name should be unique!');
      else
        return new ProductInterface(await this.prisma.product.update({
          where: {
            id: product.id
          },
          data: {
            price: productDto.price,
            composition: productDto.composition,
            weight: productDto.weight,
            calories: productDto.calories,
            picture: productDto.picture,
            isActive: true
          }
        }))
    }

    return new ProductInterface(await this.prisma.product.create({
      data: {
        name: productDto.name,
        type: productDto.type,
        price: productDto.price,
        composition: productDto.composition,
        weight: productDto.weight,
        calories: productDto.calories,
        picture: productDto.picture
      }
    }))
  }

  async getProduct(productId: string): Promise<ProductInterface>{
    let product = await this.prisma.product.findUnique({
      where: {
        id: productId
      }
    });
    if (product == null)
      throw new BadRequestException('Invalid productId')
    return new ProductInterface(product)
  }

  async updateProduct(productId: string, productDto: ProductUpdateDto): Promise<ProductInterface>{
    return new ProductInterface(await this.prisma.product.update({
      where: {
        id: productId
      },
      data: {
        price: productDto.price,
        composition: productDto.composition,
        weight: productDto.weight,
        calories: productDto.calories,
        picture: productDto.picture
      }
    }))
  }

  async deleteProduct(productId: string){
    await this.prisma.product.update({
      where: {
        id: productId
      },
      data:{
        isActive: false,
      }
    })
  }
  async addUniqueProduct(productDto: UniqueProductDto): Promise<UniqueProductInterface>{
    return new UniqueProductInterface(await this.prisma.uniqueProduct.create({
          data: {
            type: productDto.type,
            biscuit: productDto.biscuit,
            cream: productDto.cream,
            filling: productDto.filling,
            design: productDto.design,
            price: productDto.price,
            composition: productDto.composition,
            weight: productDto.weight,
            calories: productDto.calories,
            picture: productDto.picture,
          }
        }))
  }

  async getUniqueProduct(productId: string): Promise<UniqueProductInterface>{
    let product = await this.prisma.uniqueProduct.findUnique({
      where: {
        id: productId
      }
    });
    if (product == null)
      throw new BadRequestException('Invalid productId')
    return new UniqueProductInterface(product)
  }

  async deleteUniqueProduct(productId: string){
    await this.prisma.uniqueProduct.delete({
      where: {
        id: productId
      }
    })
  }
  async addNewSpecialProduct(specialDto: NewSpecialDto): Promise<SpecialInterface>{
    let exProduct = await this.prisma.product.findUnique({
      where: {
        name : specialDto.name
      }
    },)
    if (exProduct != null)
      throw new BadRequestException('Invalid product name');

    let product = await this.prisma.product.create({
      data: {
        name: specialDto.name,
        type: specialDto.type,
        composition: specialDto.composition,
        weight: specialDto.weight,
        calories: specialDto.calories,
        price: specialDto.prev_price,
        picture: specialDto.picture
      }
    })
    return new SpecialInterface(await this.prisma.special.create({
      data: {
        product_id: product.id,
        new_price: specialDto.new_price,
        end_date: specialDto.end_date
      }
    }), product)
  }

  async addSpecialProduct(productId: string, specialDto: ExistingSpecialDto): Promise<SpecialInterface>{
    let special = await this.prisma.special.findUnique({
      where: {
        product_id: productId
      }
    })
    if (special != null)
      return this.updateSpecialProduct(productId, specialDto)
    else{
      let product = await this.getProduct(productId);
      if (!product.isActive)
        await this.prisma.product.update({
          where: {
            id: productId
          },
          data:{
            isActive: false,
          }
        })
      return new SpecialInterface(await this.prisma.special.create({
        data: {
          product_id: productId,
          new_price: specialDto.new_price,
          end_date: specialDto.end_date
        }
      }), product)
    }
  }

  async getSpecialProducts(): Promise<SpecialInterface[]>{
    let specials = await this.prisma.special.findMany({
      where: {
        product:{
          isActive: true
        },
        end_date: {
          gte: new Date(Date.now())
        }
      },
      include: {
        product: true
      }
    });
    if (specials == null || specials.length == 0)
      throw new NotFoundException('No specials now.');
    let result = new Array<SpecialInterface>();
    for (const special of specials){
      result.push(new SpecialInterface(special, special.product))
    }
    return result
  }

  async updateSpecialProduct(productId: string, specialDto: ExistingSpecialDto): Promise<SpecialInterface>{
    let special = await this.prisma.special.findUnique({
      where: {
        product_id : productId
      },
      include: {
        product: true
      }
    });
    if (special == null)
      throw new BadRequestException('Invalid productId');
    if (!special.product.isActive)
      await this.prisma.product.update({
        where: {
          id: productId
        },
        data:{
          isActive: false,
        }
      })
    return new SpecialInterface(await this.prisma.special.update({
      where:{
        product_id : productId
      },
      data:{
        new_price: specialDto.new_price,
        end_date: specialDto.end_date
      }
    }), special.product)
  }

  async deleteSpecialProduct(productId: string){
    await this.prisma.special.delete({
      where: {
        id: productId
      }
    })
  }

  async deleteSpecialProductWithProduct(productId: string){
    await this.prisma.special.delete({
      where: {
        id: productId
      }
    });
    await this.deleteProduct(productId);
  }
}