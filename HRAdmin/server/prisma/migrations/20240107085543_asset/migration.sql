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
