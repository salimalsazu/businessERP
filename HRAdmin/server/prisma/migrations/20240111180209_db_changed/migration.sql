/*
  Warnings:

  - You are about to drop the column `kmLastMonth` on the `FuelList` table. All the data in the column will be lost.
  - You are about to drop the column `kmThisMonth` on the `FuelList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FuelList" DROP COLUMN "kmLastMonth",
DROP COLUMN "kmThisMonth";
