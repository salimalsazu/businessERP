/*
  Warnings:

  - Added the required column `employeeCost` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealRate` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMeal` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "employeeCost" INTEGER NOT NULL,
ADD COLUMN     "mealRate" INTEGER NOT NULL,
ADD COLUMN     "totalMeal" INTEGER NOT NULL;
