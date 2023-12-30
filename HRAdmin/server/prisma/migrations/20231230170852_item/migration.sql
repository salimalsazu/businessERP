/*
  Warnings:

  - A unique constraint covering the columns `[itemName]` on the table `stationary_item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stationary_item_itemName_key" ON "stationary_item"("itemName");
