/*
  Warnings:

  - You are about to drop the column `chasis_number` on the `Car` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chasisNumber]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chasisNumber` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "chasis_number",
ADD COLUMN     "chasisNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" TEXT;

-- CreateTable
CREATE TABLE "Dates" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3),
    "finalPaymentDate" TIMESTAMP(3),
    "deliveryAtPortDate" TIMESTAMP(3),
    "exitFromPortDate" TIMESTAMP(3),
    "customerAcquisitionDate" TIMESTAMP(3),
    "finalClientPaymentDate" TIMESTAMP(3),
    "totalDuration" INTEGER,

    CONSTRAINT "Dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Costs" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "landingCost" DECIMAL(10,2) NOT NULL,
    "duty" DECIMAL(10,2) NOT NULL,
    "portCharges" DECIMAL(10,2) NOT NULL,
    "clearingCost" DECIMAL(10,2) NOT NULL,
    "fuelAndDriver" DECIMAL(10,2) NOT NULL,
    "insurance" DECIMAL(10,2) NOT NULL,
    "serviceCost" DECIMAL(10,2) NOT NULL,
    "otherCost" DECIMAL(10,2),
    "brokerCost" DECIMAL(10,2),
    "totalCost" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "targetMarkup" DECIMAL(5,2) NOT NULL,
    "targetSellingPrice" DECIMAL(10,2) NOT NULL,
    "actualSellingPrice" DECIMAL(10,2) NOT NULL,
    "discountPremium" DECIMAL(5,2),

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Margins" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "marginAbsolute" DECIMAL(10,2),
    "marginRelative" DECIMAL(5,2),

    CONSTRAINT "Margins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditSales" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "amountPaidSoFar" DECIMAL(10,2) NOT NULL,
    "pendingBalance" DECIMAL(10,2) NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "paymentNotes" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "CreditSales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Remarks" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "pendingItems" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Remarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CapitalInvestors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,

    CONSTRAINT "CapitalInvestors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarInvestments" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "investorId" INTEGER NOT NULL,
    "initialAmount" DECIMAL(10,2) NOT NULL,
    "profitShare" DECIMAL(10,2),
    "commission" DECIMAL(10,2),
    "totalBalance" DECIMAL(10,2),
    "remarks" TEXT,

    CONSTRAINT "CarInvestments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dates_carId_key" ON "Dates"("carId");

-- CreateIndex
CREATE UNIQUE INDEX "Costs_carId_key" ON "Costs"("carId");

-- CreateIndex
CREATE UNIQUE INDEX "Sales_carId_key" ON "Sales"("carId");

-- CreateIndex
CREATE UNIQUE INDEX "Margins_carId_key" ON "Margins"("carId");

-- CreateIndex
CREATE UNIQUE INDEX "CarInvestments_carId_investorId_key" ON "CarInvestments"("carId", "investorId");

-- CreateIndex
CREATE UNIQUE INDEX "Car_chasisNumber_key" ON "Car"("chasisNumber");

-- AddForeignKey
ALTER TABLE "Dates" ADD CONSTRAINT "Dates_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Costs" ADD CONSTRAINT "Costs_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Margins" ADD CONSTRAINT "Margins_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditSales" ADD CONSTRAINT "CreditSales_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remarks" ADD CONSTRAINT "Remarks_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarInvestments" ADD CONSTRAINT "CarInvestments_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarInvestments" ADD CONSTRAINT "CarInvestments_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "CapitalInvestors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
