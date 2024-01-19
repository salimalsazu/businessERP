/*
  Warnings:

  - You are about to drop the column `limit` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "limit",
ADD COLUMN     "mobileBillingLimit" INTEGER;
