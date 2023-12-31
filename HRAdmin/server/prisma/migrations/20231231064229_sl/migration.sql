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
    "jobId" TEXT NOT NULL,
    "profileImage" TEXT,
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
    "lastAssignedDate" TIMESTAMPTZ(0) NOT NULL,
    "assignQuantity" INTEGER NOT NULL,
    "purchaseQuantity" INTEGER NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "stationaryItemId" TEXT NOT NULL,
    "stockItemStatus" "itemStatus" NOT NULL,
    "assignItemStatus" "assignStatus" NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "stationary_list_pkey" PRIMARY KEY ("stationaryListId")
);

-- CreateTable
CREATE TABLE "stationary_item" (
    "stationaryItemId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "stationary_item_pkey" PRIMARY KEY ("stationaryItemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_profileId_key" ON "users"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "stationary_item_itemName_key" ON "stationary_item"("itemName");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_foods" ADD CONSTRAINT "user_foods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_foods" ADD CONSTRAINT "user_foods_foodExpId_fkey" FOREIGN KEY ("foodExpId") REFERENCES "foods"("foodExpId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stationary_list" ADD CONSTRAINT "stationary_list_stationaryItemId_fkey" FOREIGN KEY ("stationaryItemId") REFERENCES "stationary_item"("stationaryItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stationary_list" ADD CONSTRAINT "stationary_list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
