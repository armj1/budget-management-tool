/*
  Warnings:

  - You are about to alter the column `childSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `educationSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `foodSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `healthSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `housingSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `insuranceSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `investmentSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `leisureSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `otherSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `petSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `recreationSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `shoppingSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `taxedIncome` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `totalIncome` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `transportSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE `financialrecord` MODIFY `childSpending` DECIMAL(15, 2) NOT NULL,
    MODIFY `educationSpending` DECIMAL(15, 2) NOT NULL,
    MODIFY `foodSpending` DECIMAL(15, 2) NOT NULL,
    MODIFY `healthSpending` DECIMAL(15, 2) NOT NULL,
    MODIFY `housingSpending` DECIMAL(15, 2) NOT NULL,
    MODIFY `insuranceSpending` DECIMAL(15, 2) NOT NULL,
    MODIFY `investmentSpending` DECIMAL(15, 2) NOT NULL,
    MODIFY `leisureSpending` DECIMAL(15, 2) NOT NULL,
    MODIFY `otherSpending` DECIMAL(15, 2) NOT NULL,
    MODIFY `petSpending` DECIMAL(15, 2) NOT NULL,
    MODIFY `recreationSpending` DECIMAL(15, 2) NOT NULL,
    MODIFY `shoppingSpending` DECIMAL(15, 2) NOT NULL,
    MODIFY `taxedIncome` DECIMAL(15, 2) NOT NULL,
    MODIFY `totalIncome` DECIMAL(15, 2) NOT NULL,
    MODIFY `transportSpending` DECIMAL(15, 2) NOT NULL;
