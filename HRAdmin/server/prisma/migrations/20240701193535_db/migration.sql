/*
  Warnings:

  - The values [cash,cheque] on the enum `ChequeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChequeType_new" AS ENUM ('Cash', 'Cheque');
ALTER TABLE "Requisition" ALTER COLUMN "amountType" TYPE "ChequeType_new" USING ("amountType"::text::"ChequeType_new");
ALTER TYPE "ChequeType" RENAME TO "ChequeType_old";
ALTER TYPE "ChequeType_new" RENAME TO "ChequeType";
DROP TYPE "ChequeType_old";
COMMIT;
