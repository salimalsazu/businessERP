-- CreateTable
CREATE TABLE "VehicleAdd" (
    "vehicleId" TEXT NOT NULL,
    "vehicleName" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "VehicleAdd_pkey" PRIMARY KEY ("vehicleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleAdd_vehicleName_key" ON "VehicleAdd"("vehicleName");
