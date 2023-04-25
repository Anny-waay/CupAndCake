import { PaymentType, ProductType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NewSpecialDto {
  @ApiProperty({
    description: 'product name',
    example: "Клубничный торт"
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'type of product',
    example: ProductType.CAKE
  })
  @IsNotEmpty()
  type: ProductType;

  @ApiProperty({
    description: 'composition of the product',
    example: 'яйцо, мука, клубника, сливки'
  })
  @IsNotEmpty()
  @IsString()
  composition: string;

  @ApiProperty({
    description: 'weight of the product',
    example: 2000
  })
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty({
    description: 'calories',
    example: 347
  })
  @IsNotEmpty()
  @IsNumber()
  calories: number;

  @ApiProperty({
    description: 'usual price',
    example: 3299
  })
  @IsNotEmpty()
  @IsNumber()
  prev_price: number;

  @ApiProperty({
    description: 'new price(sale)',
    example: 1999
  })
  @IsNotEmpty()
  @IsNumber()
  new_price: number;

  @ApiProperty({
    description: 'end date for sale',
    example: "2023-05-07T18:00:00.000Z"
  })
  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @ApiProperty({
    description: 'picture of product',
    example: "images/strawberry_cake.jpeg"
  })
  @IsNotEmpty()
  @IsString()
  picture: string;
}