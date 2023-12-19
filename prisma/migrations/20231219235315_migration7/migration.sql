/*
  Warnings:

  - You are about to drop the `time` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `financialrecord` DROP FOREIGN KEY `financialRecord_userId_fkey`;

-- DropForeignKey
ALTER TABLE `time` DROP FOREIGN KEY `time_ibfk_1`;

-- AlterTable
ALTER TABLE `financialrecord` ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `time`;

-- AddForeignKey
ALTER TABLE `financialRecord` ADD CONSTRAINT `financialRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
