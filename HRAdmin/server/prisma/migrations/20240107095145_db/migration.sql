/*
  Warnings:

  - A unique constraint covering the columns `[assetId]` on the table `asset_list` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "asset_list_assetId_key" ON "asset_list"("assetId");
