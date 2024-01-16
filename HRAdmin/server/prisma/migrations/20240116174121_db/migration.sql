/*
  Warnings:

  - Added the required column `docFile` to the `TransportDoc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransportDoc" ADD COLUMN     "docFile" TEXT NOT NULL;
