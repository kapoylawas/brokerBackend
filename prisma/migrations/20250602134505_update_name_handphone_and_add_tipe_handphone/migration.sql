/*
  Warnings:

  - You are about to drop the column `name_handphone` on the `barang_masuks` table. All the data in the column will be lost.
  - Added the required column `namehandphone_id` to the `barang_masuks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barang_masuks` DROP COLUMN `name_handphone`,
    ADD COLUMN `namehandphone_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `tipe_handphones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `barang_masuks` ADD CONSTRAINT `barang_masuks_namehandphone_id_fkey` FOREIGN KEY (`namehandphone_id`) REFERENCES `tipe_handphones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
