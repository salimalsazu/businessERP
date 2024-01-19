-- CreateTable
CREATE TABLE "MobileBill" (
    "mobileBillId" TEXT NOT NULL,
    "billDate" TIMESTAMPTZ(0) NOT NULL,
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

-- AddForeignKey
ALTER TABLE "MobileBill" ADD CONSTRAINT "MobileBill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
