/*
  Warnings:

  - The primary key for the `Requisition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `requsitionDate` on the `Requisition` table. All the data in the column will be lost.
  - You are about to drop the column `requsitionId` on the `Requisition` table. All the data in the column will be lost.
  - Added the required column `requisitionDate` to the `Requisition` table without a default value. This is not possible if the table is not empty.
  - The required column `requisitionId` was added to the `Requisition` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Requisition" DROP CONSTRAINT "Requisition_pkey",
DROP COLUMN "requsitionDate",
DROP COLUMN "requsitionId",
ADD COLUMN     "requisitionDate" TIMESTAMPTZ(0) NOT NULL,
ADD COLUMN     "requisitionId" TEXT NOT NULL,
ADD CONSTRAINT "Requisition_pkey" PRIMARY KEY ("requisitionId");
