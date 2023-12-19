/*
  Warnings:

  - Added the required column `childSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educationSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `housingSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `insuranceSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investmentSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leisureSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recreationSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shoppingSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxedIncome` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalIncome` to the `financialRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportSpending` to the `financialRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `financialrecord` ADD COLUMN `childSpending` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `educationSpending` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `foodSpending` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `healthSpending` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `housingSpending` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `insuranceSpending` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `investmentSpending` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `leisureSpending` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `otherSpending` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `petSpending` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `recreationSpending` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `shoppingSpending` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `taxedIncome` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `totalIncome` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `transportSpending` DECIMAL(65, 30) NOT NULL;
