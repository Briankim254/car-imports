/*
  Warnings:

  - You are about to drop the `Margins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Margins" DROP CONSTRAINT "Margins_carId_fkey";

-- DropTable
DROP TABLE "Margins";
