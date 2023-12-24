/*
  Warnings:

  - Added the required column `monthlyEmployeeTotalCost` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyMealRate` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyTotalMeal` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "monthlyEmployeeTotalCost" INTEGER NOT NULL,
ADD COLUMN     "monthlyMealRate" INTEGER NOT NULL,
ADD COLUMN     "monthlyTotalMeal" INTEGER NOT NULL;
