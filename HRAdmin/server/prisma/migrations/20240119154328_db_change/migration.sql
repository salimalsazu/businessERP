/*
  Warnings:

  - Added the required column `billingMonth` to the `MobileBill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MobileBill" ADD COLUMN     "billingMonth" TEXT NOT NULL;
