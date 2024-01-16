/*
  Warnings:

  - You are about to drop the column `vehcielId` on the `TransportDoc` table. All the data in the column will be lost.
  - Added the required column `vehicleId` to the `TransportDoc` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransportDoc" DROP CONSTRAINT "TransportDoc_vehcielId_fkey";

-- AlterTable
ALTER TABLE "TransportDoc" DROP COLUMN "vehcielId",
ADD COLUMN     "vehicleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TransportDoc" ADD CONSTRAINT "TransportDoc_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "VehicleAdd"("vehicleId") ON DELETE RESTRICT ON UPDATE CASCADE;
