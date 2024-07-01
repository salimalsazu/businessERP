-- CreateEnum
CREATE TYPE "requestFor" AS ENUM ('Assign', 'Servicing');

-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('SUPERADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Active', 'Paused', 'Suspended', 'Pending');

-- CreateEnum
CREATE TYPE "isMeal" AS ENUM ('Yes', 'No');

-- CreateEnum
CREATE TYPE "itemStatus" AS ENUM ('Excellent', 'Good', 'Poor');

-- CreateEnum
CREATE TYPE "assignStatus" AS ENUM ('Pending', 'Approval', 'Rejected');

-- CreateEnum
CREATE TYPE "docStatus" AS ENUM ('Expired', 'Valid');

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userStatus" "UserStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "profileId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "profiles" (
    "profileId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "jobId" TEXT,
    "profileImage" TEXT,
    "mobileNo" TEXT,
    "mobileBillingLimit" INTEGER,
    "role" "UserRoles" NOT NULL DEFAULT 'USER',
    "isMeal" "isMeal" NOT NULL DEFAULT 'Yes',
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "foods" (
    "foodExpId" TEXT NOT NULL,
    "totalCost" INTEGER NOT NULL,
    "foodExpDate" TIMESTAMPTZ(0) NOT NULL,
    "totalMeal" INTEGER NOT NULL,
    "employeeCost" INTEGER NOT NULL,
    "mealRate" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("foodExpId")
);

-- CreateTable
CREATE TABLE "user_foods" (
    "userFoodId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodExpId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_foods_pkey" PRIMARY KEY ("userFoodId")
);

-- CreateTable
CREATE TABLE "stationary_list" (
    "stationaryListId" TEXT NOT NULL,
    "purchaseDate" TIMESTAMPTZ(0) NOT NULL,
    "purchaseQuantity" INTEGER NOT NULL,
    "stationaryItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "stationary_list_pkey" PRIMARY KEY ("stationaryListId")
);

-- CreateTable
CREATE TABLE "StationaryItemAssign" (
    "assignId" TEXT NOT NULL,
    "lastAssignedDate" TIMESTAMPTZ(0) NOT NULL,
    "assignItemStatus" "assignStatus" NOT NULL DEFAULT 'Pending',
    "assignQuantity" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "stationaryItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "StationaryItemAssign_pkey" PRIMARY KEY ("assignId")
);

-- CreateTable
CREATE TABLE "stationary_item" (
    "stationaryItemId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "stockItemStatus" "itemStatus",
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "stationary_item_pkey" PRIMARY KEY ("stationaryItemId")
);

-- CreateTable
CREATE TABLE "asset_list" (
    "assetListId" TEXT NOT NULL,
    "assetName" TEXT NOT NULL,
    "assetModel" TEXT NOT NULL,
    "assetQuantity" INTEGER NOT NULL,
    "assetLocation" TEXT NOT NULL,
    "assetCategory" TEXT NOT NULL,
    "assetImage" TEXT NOT NULL,
    "purchaseDate" TIMESTAMPTZ(0) NOT NULL,
    "assetId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "asset_list_pkey" PRIMARY KEY ("assetListId")
);

-- CreateTable
CREATE TABLE "AssetAssign" (
    "assetAssignId" TEXT NOT NULL,
    "assetListId" TEXT NOT NULL,
    "assignDate" TIMESTAMPTZ(0),
    "userId" TEXT NOT NULL,
    "assignStatus" "assignStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "requestFor" "requestFor" NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "AssetAssign_pkey" PRIMARY KEY ("assetAssignId")
);

-- CreateTable
CREATE TABLE "FuelList" (
    "fuelListId" TEXT NOT NULL,
    "purchaseDate" TIMESTAMPTZ(0) NOT NULL,
    "kmPrevious" INTEGER NOT NULL,
    "kmCurrent" INTEGER NOT NULL,
    "fuelQuantity" INTEGER NOT NULL,
    "fuelCost" INTEGER NOT NULL,
    "perLitreCost" INTEGER NOT NULL,
    "kmConsumed" INTEGER NOT NULL,
    "usage" INTEGER NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "FuelList_pkey" PRIMARY KEY ("fuelListId")
);

-- CreateTable
CREATE TABLE "VehicleAdd" (
    "vehicleId" TEXT NOT NULL,
    "vehicleName" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "VehicleAdd_pkey" PRIMARY KEY ("vehicleId")
);

-- CreateTable
CREATE TABLE "TransportDoc" (
    "transportDocId" TEXT NOT NULL,
    "docName" TEXT NOT NULL,
    "docNumber" TEXT NOT NULL,
    "docStatus" "docStatus" NOT NULL DEFAULT 'Valid',
    "docExpiryDate" TIMESTAMPTZ(0) NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "docFile" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "TransportDoc_pkey" PRIMARY KEY ("transportDocId")
);

-- CreateTable
CREATE TABLE "MobileBill" (
    "mobileBillId" TEXT NOT NULL,
    "billDate" TIMESTAMPTZ(0) NOT NULL,
    "billingMonth" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "billAmount" INTEGER NOT NULL,
    "billLimit" INTEGER NOT NULL,
    "usage" INTEGER NOT NULL,
    "deduction" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "MobileBill_pkey" PRIMARY KEY ("mobileBillId")
);

-- CreateTable
CREATE TABLE "MobileBalanceLimit" (
    "mobileLimitId" TEXT NOT NULL,
    "billLimit" INTEGER NOT NULL,
    "limitStatus" "assignStatus" NOT NULL DEFAULT 'Pending',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "MobileBalanceLimit_pkey" PRIMARY KEY ("mobileLimitId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_profileId_key" ON "users"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "stationary_item_itemName_key" ON "stationary_item"("itemName");

-- CreateIndex
CREATE UNIQUE INDEX "asset_list_assetId_key" ON "asset_list"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleAdd_vehicleName_key" ON "VehicleAdd"("vehicleName");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_foods" ADD CONSTRAINT "user_foods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_foods" ADD CONSTRAINT "user_foods_foodExpId_fkey" FOREIGN KEY ("foodExpId") REFERENCES "foods"("foodExpId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stationary_list" ADD CONSTRAINT "stationary_list_stationaryItemId_fkey" FOREIGN KEY ("stationaryItemId") REFERENCES "stationary_item"("stationaryItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationaryItemAssign" ADD CONSTRAINT "StationaryItemAssign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationaryItemAssign" ADD CONSTRAINT "StationaryItemAssign_stationaryItemId_fkey" FOREIGN KEY ("stationaryItemId") REFERENCES "stationary_item"("stationaryItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetAssign" ADD CONSTRAINT "AssetAssign_assetListId_fkey" FOREIGN KEY ("assetListId") REFERENCES "asset_list"("assetListId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetAssign" ADD CONSTRAINT "AssetAssign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuelList" ADD CONSTRAINT "FuelList_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "VehicleAdd"("vehicleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportDoc" ADD CONSTRAINT "TransportDoc_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "VehicleAdd"("vehicleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobileBill" ADD CONSTRAINT "MobileBill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobileBalanceLimit" ADD CONSTRAINT "MobileBalanceLimit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
