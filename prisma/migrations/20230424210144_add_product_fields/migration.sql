/*
  Warnings:

  - Added the required column `calories` to the `UniqueProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `composition` to the `UniqueProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `UniqueProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "calories" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "composition" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "weight" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UniqueProduct" ADD COLUMN     "calories" INTEGER NOT NULL,
ADD COLUMN     "composition" TEXT NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;
