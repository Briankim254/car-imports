/*
  Warnings:

  - You are about to alter the column `amountPaidSoFar` on the `CreditSales` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `pendingBalance` on the `CreditSales` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `totalAmount` on the `CreditSales` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - A unique constraint covering the columns `[carId]` on the table `CreditSales` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CreditSales" ALTER COLUMN "amountPaidSoFar" SET DATA TYPE INTEGER,
ALTER COLUMN "pendingBalance" DROP NOT NULL,
ALTER COLUMN "pendingBalance" SET DATA TYPE INTEGER,
ALTER COLUMN "totalAmount" SET DATA TYPE INTEGER,
ALTER COLUMN "status" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CreditSales_carId_key" ON "CreditSales"("carId");
