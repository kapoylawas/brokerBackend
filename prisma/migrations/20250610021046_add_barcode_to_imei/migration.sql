/*
  Warnings:

  - You are about to drop the column `sales` on the `barang_masuks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `barang_masuks` DROP COLUMN `sales`,
    ADD COLUMN `quality_control` VARCHAR(191) NULL,
    ADD COLUMN `unit` VARCHAR(191) NULL;
