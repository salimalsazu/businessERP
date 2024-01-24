-- CreateTable
CREATE TABLE "MobileBalanceLimit" (
    "mobileLimitId" TEXT NOT NULL,
    "billLimit" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "MobileBalanceLimit_pkey" PRIMARY KEY ("mobileLimitId")
);

-- AddForeignKey
ALTER TABLE "MobileBalanceLimit" ADD CONSTRAINT "MobileBalanceLimit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
