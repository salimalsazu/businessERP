/*
  Warnings:

  - Added the required column `note` to the `TransportDoc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransportDoc" ADD COLUMN     "note" TEXT NOT NULL;
