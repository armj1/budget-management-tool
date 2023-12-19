/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `financialRecord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `time` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `financialRecord_id_key` ON `financialRecord`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `time_id_key` ON `time`(`id`);
