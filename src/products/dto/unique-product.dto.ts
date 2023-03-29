import { Biscuit, Cream, Filling, ProductType } from "@prisma/client";

export class UniqueProductDto{
  type: ProductType;
  biscuit: Biscuit;
  cream: Cream;
  filling: Filling;
  design: string;
  picture: string;
}