-- CreateEnum
CREATE TYPE "chequeType" AS ENUM ('cash', 'cheque');

-- CreateEnum
CREATE TYPE "requisitionStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateTable
CREATE TABLE "Requsition" (
    "requsitionId" TEXT NOT NULL,
    "requsitionDate" TIMESTAMPTZ(0) NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "chequeNo" TEXT NOT NULL,
    "chequeDate" TIMESTAMPTZ(0) NOT NULL,
    "amount" INTEGER NOT NULL,
    "amountType" "chequeType" NOT NULL,
    "status" "requisitionStatus" NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "Requsition_pkey" PRIMARY KEY ("requsitionId")
);
