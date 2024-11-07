/*
  Warnings:

  - You are about to alter the column `targetMarkup` on the `Sales` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Sales" ALTER COLUMN "targetMarkup" SET DATA TYPE DOUBLE PRECISION;
