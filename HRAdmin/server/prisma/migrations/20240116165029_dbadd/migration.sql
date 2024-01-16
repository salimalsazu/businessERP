-- CreateEnum
CREATE TYPE "docStatus" AS ENUM ('Expired', 'Valid');

-- DropIndex
DROP INDEX "FuelList_vehicleId_key";

-- CreateTable
CREATE TABLE "TransportDoc" (
    "transportDocId" TEXT NOT NULL,
    "docName" TEXT NOT NULL,
    "docNumber" TEXT NOT NULL,
    "docStatus" "docStatus" NOT NULL DEFAULT 'Valid',
    "docExpiryDate" TIMESTAMPTZ(0) NOT NULL,
    "vehcielId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "TransportDoc_pkey" PRIMARY KEY ("transportDocId")
);

-- AddForeignKey
ALTER TABLE "TransportDoc" ADD CONSTRAINT "TransportDoc_vehcielId_fkey" FOREIGN KEY ("vehcielId") REFERENCES "VehicleAdd"("vehicleId") ON DELETE RESTRICT ON UPDATE CASCADE;
