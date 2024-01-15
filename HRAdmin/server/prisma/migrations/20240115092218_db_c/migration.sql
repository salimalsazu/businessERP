/*
  Warnings:

  - You are about to drop the column `vehicleNo` on the `FuelList` table. All the data in the column will be lost.
  - Added the required column `vehicleId` to the `FuelList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FuelList" DROP COLUMN "vehicleNo",
ADD COLUMN     "vehicleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FuelList" ADD CONSTRAINT "FuelList_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "VehicleAdd"("vehicleId") ON DELETE RESTRICT ON UPDATE CASCADE;
