/*
  Warnings:

  - You are about to alter the column `targetMarkup` on the `Sales` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(20,2)`.

*/
-- AlterTable
ALTER TABLE "CarInvestments" ALTER COLUMN "initialAmount" DROP NOT NULL,
ALTER COLUMN "initialAmount" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "profitShare" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "commission" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "totalBalance" SET DATA TYPE DECIMAL(20,2);

-- AlterTable
ALTER TABLE "Margins" ALTER COLUMN "marginAbsolute" SET DATA TYPE DECIMAL(20,2);

-- AlterTable
ALTER TABLE "Sales" ALTER COLUMN "targetMarkup" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "discountPremium" SET DATA TYPE DECIMAL(20,2);
