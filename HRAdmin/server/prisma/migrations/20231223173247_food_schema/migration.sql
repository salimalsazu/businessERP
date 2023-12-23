-- CreateTable
CREATE TABLE "foods" (
    "foodExpId" TEXT NOT NULL,
    "totalCost" INTEGER NOT NULL,
    "foodExpDate" TIMESTAMPTZ(0) NOT NULL,
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

-- AddForeignKey
ALTER TABLE "user_foods" ADD CONSTRAINT "user_foods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_foods" ADD CONSTRAINT "user_foods_foodExpId_fkey" FOREIGN KEY ("foodExpId") REFERENCES "foods"("foodExpId") ON DELETE RESTRICT ON UPDATE CASCADE;
