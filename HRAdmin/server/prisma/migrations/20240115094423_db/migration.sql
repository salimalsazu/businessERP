/*
  Warnings:

  - A unique constraint covering the columns `[vehicleId]` on the table `FuelList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FuelList_vehicleId_key" ON "FuelList"("vehicleId");
