/*
  Warnings:

  - Made the column `productId` on table `CartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "productId" SET NOT NULL;
