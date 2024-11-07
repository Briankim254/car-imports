/*
  Warnings:

  - A unique constraint covering the columns `[carId]` on the table `Remarks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Costs" ADD COLUMN     "remarks" TEXT;

-- AlterTable
ALTER TABLE "CreditSales" ALTER COLUMN "paymentNotes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Dates" ADD COLUMN     "remarks" TEXT;

-- AlterTable
ALTER TABLE "Margins" ADD COLUMN     "remarks" TEXT;

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "remarks" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Remarks_carId_key" ON "Remarks"("carId");
