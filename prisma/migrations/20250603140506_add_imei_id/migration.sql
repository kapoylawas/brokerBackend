/*
  Warnings:

  - You are about to drop the column `imei` on the `barang_masuks` table. All the data in the column will be lost.
  - Added the required column `imei_id` to the `barang_masuks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `barang_masuks_imei_key` ON `barang_masuks`;

-- AlterTable
ALTER TABLE `barang_masuks` DROP COLUMN `imei`,
    ADD COLUMN `imei_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Imei` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imei` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Imei_imei_key`(`imei`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `barang_masuks` ADD CONSTRAINT `barang_masuks_imei_id_fkey` FOREIGN KEY (`imei_id`) REFERENCES `Imei`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
