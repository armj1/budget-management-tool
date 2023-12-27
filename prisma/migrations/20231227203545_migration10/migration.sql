/*
  Warnings:

  - You are about to alter the column `totalIncome` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `financialrecord` MODIFY `totalIncome` DOUBLE NOT NULL;
