/*
  Warnings:

  - You are about to drop the column `assignItemStatus` on the `stationary_list` table. All the data in the column will be lost.
  - You are about to drop the column `assignQuantity` on the `stationary_list` table. All the data in the column will be lost.
  - You are about to drop the column `lastAssignedDate` on the `stationary_list` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `stationary_list` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "stationary_list" DROP CONSTRAINT "stationary_list_userId_fkey";

-- AlterTable
ALTER TABLE "stationary_list" DROP COLUMN "assignItemStatus",
DROP COLUMN "assignQuantity",
DROP COLUMN "lastAssignedDate",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "StationaryItemAssign" (
    "assignId" TEXT NOT NULL,
    "lastAssignedDate" TIMESTAMPTZ(0) NOT NULL,
    "assignItemStatus" "assignStatus" NOT NULL,
    "assignQuantity" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "stationaryItemId" TEXT NOT NULL,

    CONSTRAINT "StationaryItemAssign_pkey" PRIMARY KEY ("assignId")
);

-- AddForeignKey
ALTER TABLE "StationaryItemAssign" ADD CONSTRAINT "StationaryItemAssign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationaryItemAssign" ADD CONSTRAINT "StationaryItemAssign_stationaryItemId_fkey" FOREIGN KEY ("stationaryItemId") REFERENCES "stationary_item"("stationaryItemId") ON DELETE RESTRICT ON UPDATE CASCADE;
