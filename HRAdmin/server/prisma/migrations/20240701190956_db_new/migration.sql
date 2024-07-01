/*
  Warnings:

  - You are about to drop the `Requsition` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ChequeType" AS ENUM ('cash', 'cheque');

-- CreateEnum
CREATE TYPE "RequisitionStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- DropTable
DROP TABLE "Requsition";

-- DropEnum
DROP TYPE "chequeType";

-- DropEnum
DROP TYPE "requisitionStatus";

-- CreateTable
CREATE TABLE "Requisition" (
    "requsitionId" TEXT NOT NULL,
    "requsitionDate" TIMESTAMPTZ(0) NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "chequeNo" TEXT NOT NULL,
    "chequeDate" TIMESTAMPTZ(0) NOT NULL,
    "amount" INTEGER NOT NULL,
    "amountType" "ChequeType" NOT NULL,
    "status" "RequisitionStatus" NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "Requisition_pkey" PRIMARY KEY ("requsitionId")
);
