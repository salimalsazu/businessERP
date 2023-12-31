/*
  Warnings:

  - You are about to drop the column `stockQuantity` on the `stationary_list` table. All the data in the column will be lost.
  - Added the required column `stockQuantity` to the `stationary_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stationary_item" ADD COLUMN     "stockQuantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "stationary_list" DROP COLUMN "stockQuantity";
