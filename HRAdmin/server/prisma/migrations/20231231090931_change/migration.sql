/*
  Warnings:

  - You are about to drop the column `stockItemStatus` on the `stationary_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stationary_item" ADD COLUMN     "stockItemStatus" "itemStatus";

-- AlterTable
ALTER TABLE "stationary_list" DROP COLUMN "stockItemStatus";
