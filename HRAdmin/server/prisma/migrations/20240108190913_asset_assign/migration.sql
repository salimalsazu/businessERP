-- CreateEnum
CREATE TYPE "requestFor" AS ENUM ('Assign', 'Servicing');

-- CreateTable
CREATE TABLE "AssetAssign" (
    "assetAssignId" TEXT NOT NULL,
    "assetListId" TEXT NOT NULL,
    "assignDate" TIMESTAMPTZ(0) NOT NULL,
    "userId" TEXT NOT NULL,
    "assignStatus" "assignStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "requestFor" "requestFor" NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "AssetAssign_pkey" PRIMARY KEY ("assetAssignId")
);

-- AddForeignKey
ALTER TABLE "AssetAssign" ADD CONSTRAINT "AssetAssign_assetListId_fkey" FOREIGN KEY ("assetListId") REFERENCES "asset_list"("assetListId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetAssign" ADD CONSTRAINT "AssetAssign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
