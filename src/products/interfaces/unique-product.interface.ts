import { Biscuit, Cream, Filling, ProductType } from "@prisma/client";

export interface UniqueProduct{
  type: ProductType;
  biscuit: Biscuit;
  cream: Cream;
  filling: Filling;
  design: string;
  price: number;
  picture: string;
}