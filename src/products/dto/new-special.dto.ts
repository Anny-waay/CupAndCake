import { ProductType } from "@prisma/client";

export class NewSpecialDto {
  name: string;
  type: ProductType;
  prev_price: number;
  new_price: number;
  end_date: Date;
  picture: string;
}