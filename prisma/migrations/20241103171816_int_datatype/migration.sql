/*
  Warnings:

  - You are about to alter the column `landingCost` on the `Costs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `duty` on the `Costs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `portCharges` on the `Costs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `clearingCost` on the `Costs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `fuelAndDriver` on the `Costs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `insurance` on the `Costs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `serviceCost` on the `Costs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `otherCost` on the `Costs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `brokerCost` on the `Costs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `totalCost` on the `Costs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `targetSellingPrice` on the `Sales` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `actualSellingPrice` on the `Sales` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Costs" ALTER COLUMN "landingCost" DROP NOT NULL,
ALTER COLUMN "landingCost" SET DATA TYPE INTEGER,
ALTER COLUMN "duty" DROP NOT NULL,
ALTER COLUMN "duty" SET DATA TYPE INTEGER,
ALTER COLUMN "portCharges" DROP NOT NULL,
ALTER COLUMN "portCharges" SET DATA TYPE INTEGER,
ALTER COLUMN "clearingCost" DROP NOT NULL,
ALTER COLUMN "clearingCost" SET DATA TYPE INTEGER,
ALTER COLUMN "fuelAndDriver" DROP NOT NULL,
ALTER COLUMN "fuelAndDriver" SET DATA TYPE INTEGER,
ALTER COLUMN "insurance" DROP NOT NULL,
ALTER COLUMN "insurance" SET DATA TYPE INTEGER,
ALTER COLUMN "serviceCost" DROP NOT NULL,
ALTER COLUMN "serviceCost" SET DATA TYPE INTEGER,
ALTER COLUMN "otherCost" SET DATA TYPE INTEGER,
ALTER COLUMN "brokerCost" SET DATA TYPE INTEGER,
ALTER COLUMN "totalCost" DROP NOT NULL,
ALTER COLUMN "totalCost" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Sales" ALTER COLUMN "targetSellingPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "actualSellingPrice" SET DATA TYPE INTEGER;
