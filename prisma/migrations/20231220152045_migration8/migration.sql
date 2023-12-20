/*
  Warnings:

  - You are about to alter the column `childSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `educationSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `foodSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `healthSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `housingSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `insuranceSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `investmentSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `leisureSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `otherSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `petSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `recreationSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `shoppingSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `taxedIncome` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `totalIncome` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.
  - You are about to alter the column `transportSpending` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(65,2)`.

*/
-- AlterTable
ALTER TABLE `financialrecord` MODIFY `childSpending` DECIMAL(65, 2) NOT NULL,
    MODIFY `educationSpending` DECIMAL(65, 2) NOT NULL,
    MODIFY `foodSpending` DECIMAL(65, 2) NOT NULL,
    MODIFY `healthSpending` DECIMAL(65, 2) NOT NULL,
    MODIFY `housingSpending` DECIMAL(65, 2) NOT NULL,
    MODIFY `insuranceSpending` DECIMAL(65, 2) NOT NULL,
    MODIFY `investmentSpending` DECIMAL(65, 2) NOT NULL,
    MODIFY `leisureSpending` DECIMAL(65, 2) NOT NULL,
    MODIFY `otherSpending` DECIMAL(65, 2) NOT NULL,
    MODIFY `petSpending` DECIMAL(65, 2) NOT NULL,
    MODIFY `recreationSpending` DECIMAL(65, 2) NOT NULL,
    MODIFY `shoppingSpending` DECIMAL(65, 2) NOT NULL,
    MODIFY `taxedIncome` DECIMAL(65, 2) NOT NULL,
    MODIFY `totalIncome` DECIMAL(65, 2) NOT NULL,
    MODIFY `transportSpending` DECIMAL(65, 2) NOT NULL;
