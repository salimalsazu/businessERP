-- CreateTable
CREATE TABLE "FuelList" (
    "fuelListId" TEXT NOT NULL,
    "purchaseDate" TIMESTAMPTZ(0) NOT NULL,
    "vehicleNo" TEXT NOT NULL,
    "kmPrevious" INTEGER NOT NULL,
    "kmCurrent" INTEGER NOT NULL,
    "fuelQuantity" INTEGER NOT NULL,
    "fuelCost" INTEGER NOT NULL,
    "perLitreCost" INTEGER NOT NULL,
    "kmConsumed" INTEGER NOT NULL,
    "kmLastMonth" INTEGER NOT NULL,
    "kmThisMonth" INTEGER NOT NULL,
    "usage" INTEGER NOT NULL,
    "fuelDate" TIMESTAMPTZ(0) NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "FuelList_pkey" PRIMARY KEY ("fuelListId")
);
