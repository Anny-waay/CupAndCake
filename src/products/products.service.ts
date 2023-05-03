import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { ProductCreateDto } from "./dto/product.create.dto";
import { NewSpecialDto } from "./dto/new-special.dto";
import { SpecialDto } from "./dto/special.dto";
import { ExistingSpecialDto } from "./dto/existing-special.dto";
import { ProductType } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { ProductUpdateDto } from "./dto/product.update.dto";
import { UniqueProductDto } from "./dto/unique-product.dto";
import { UniqueProductCreateDto } from "./dto/unique-product.create.dto";
import { AppGateway } from "../gateway/app.gateway";

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService, private readonly gateway: AppGateway,) {}

  async getCatalog(page: number, limit: number): Promise<ProductDto[]>{
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

    let result = new Array<ProductDto>();
    for (const product of catalog){
      result.push(new ProductDto(product));
    }
    return result;
  }

  async getCatalogType(type: ProductType, page: number, limit: number): Promise<ProductDto[]>{
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

    let result = new Array<ProductDto>();
    for (const product of catalog){
      result.push(new ProductDto(product));
    }
    return result;
  }

  async search(request: string): Promise<ProductDto[]>{
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

    let result = new Array<ProductDto>();
    for (const product of products){
      result.push(new ProductDto(product));
    }
    return result;
  }

  async addProduct(productDto: ProductCreateDto): Promise<ProductDto>{
    let product = await this.prisma.product.findUnique({
      where: {
        name : productDto.name
      }
    },)
    if (product != null){
      if (product.isActive)
        throw new BadRequestException('Product name should be unique!');
      else
        return new ProductDto(await this.prisma.product.update({
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

    return new ProductDto(await this.prisma.product.create({
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

  async getProduct(productId: string): Promise<ProductDto>{
    let product = await this.prisma.product.findUniqueOrThrow({
      where: {
        id: productId
      }
    });
    return new ProductDto(product)
  }

  async updateProduct(productId: string, productDto: ProductUpdateDto): Promise<ProductDto>{
    return new ProductDto(await this.prisma.product.update({
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
  async addUniqueProduct(productDto: UniqueProductCreateDto): Promise<UniqueProductDto>{
    return new UniqueProductDto(await this.prisma.uniqueProduct.create({
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

  async getUniqueProduct(productId: string): Promise<UniqueProductDto>{
    let product = await this.prisma.uniqueProduct.findUniqueOrThrow({
      where: {
        id: productId
      }
    });
    return new UniqueProductDto(product)
  }

  async updateUniqueProduct(productId: string, productDto: UniqueProductCreateDto): Promise<UniqueProductDto>{
    return new UniqueProductDto(await this.prisma.uniqueProduct.update({
      where:{
        id: productId
      },
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

  async deleteUniqueProduct(productId: string){
    await this.prisma.uniqueProduct.delete({
      where: {
        id: productId
      }
    })
  }
  async addNewSpecialProduct(specialDto: NewSpecialDto): Promise<SpecialDto>{
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
    let dto = new SpecialDto(await this.prisma.special.create({
      data: {
        product_id: product.id,
        new_price: specialDto.new_price,
        end_date: specialDto.end_date
      }
    }), product)
    this.gateway.server.emit('newSpecial', dto);
    return dto
  }

  async addSpecialProduct(productId: string, specialDto: ExistingSpecialDto): Promise<SpecialDto>{
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
            isActive: true,
          }
        })
      let dto = new SpecialDto(await this.prisma.special.create({
        data: {
          product_id: productId,
          new_price: specialDto.new_price,
          end_date: specialDto.end_date
        }
      }), product)
      this.gateway.server.emit('newSpecial', dto);
      return dto
    }
  }

  async getSpecialProducts(): Promise<SpecialDto[]>{
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
    let result = new Array<SpecialDto>();
    for (const special of specials){
      result.push(new SpecialDto(special, new ProductDto(special.product)))
    }
    return result
  }

  async updateSpecialProduct(productId: string, specialDto: ExistingSpecialDto): Promise<SpecialDto>{
    let special = await this.prisma.special.findUniqueOrThrow({
      where: {
        product_id : productId
      },
      include: {
        product: true
      }
    });

    if (!special.product.isActive)
      await this.prisma.product.update({
        where: {
          id: productId
        },
        data:{
          isActive: false,
        }
      })
    let dto = new SpecialDto(await this.prisma.special.update({
      where:{
        product_id : productId
      },
      data:{
        new_price: specialDto.new_price,
        end_date: specialDto.end_date
      }
    }), new ProductDto(special.product))
    this.gateway.server.emit('newSpecial', dto);
    return dto
  }

  async deleteSpecialProduct(productId: string){
    await this.prisma.special.delete({
      where: {
        id: productId
      }
    })
  }

  async deleteSpecialProductWithProduct(productId: string){
    let special = await this.prisma.special.delete({
      where: {
        id: productId
      }
    });
    await this.deleteProduct(special.product_id);
  }
}