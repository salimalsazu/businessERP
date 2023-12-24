/*
  Warnings:

  - You are about to drop the column `monthlyEmployeeTotalCost` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyMealRate` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyTotalMeal` on the `foods` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "foods" DROP COLUMN "monthlyEmployeeTotalCost",
DROP COLUMN "monthlyMealRate",
DROP COLUMN "monthlyTotalMeal";
