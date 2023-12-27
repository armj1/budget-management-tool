/*
  Warnings:

  - You are about to alter the column `childSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `educationSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `foodSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `healthSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `housingSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `insuranceSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `investmentSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `leisureSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `otherSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `petSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `recreationSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `shoppingSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `taxedIncome` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `transportSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.
  - You are about to alter the column `leftoverMoney` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `financialrecord` MODIFY `childSpending` DOUBLE NOT NULL,
    MODIFY `educationSpending` DOUBLE NOT NULL,
    MODIFY `foodSpending` DOUBLE NOT NULL,
    MODIFY `healthSpending` DOUBLE NOT NULL,
    MODIFY `housingSpending` DOUBLE NOT NULL,
    MODIFY `insuranceSpending` DOUBLE NOT NULL,
    MODIFY `investmentSpending` DOUBLE NOT NULL,
    MODIFY `leisureSpending` DOUBLE NOT NULL,
    MODIFY `otherSpending` DOUBLE NOT NULL,
    MODIFY `petSpending` DOUBLE NOT NULL,
    MODIFY `recreationSpending` DOUBLE NOT NULL,
    MODIFY `shoppingSpending` DOUBLE NOT NULL,
    MODIFY `taxedIncome` DOUBLE NOT NULL,
    MODIFY `transportSpending` DOUBLE NOT NULL,
    MODIFY `leftoverMoney` DOUBLE NOT NULL DEFAULT 0;
