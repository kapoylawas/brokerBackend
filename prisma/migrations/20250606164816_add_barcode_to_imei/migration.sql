/*
  Warnings:

  - You are about to drop the column `kapasitas` on the `barang_masuks` table. All the data in the column will be lost.
  - You are about to drop the column `kode_negara` on the `barang_masuks` table. All the data in the column will be lost.
  - You are about to drop the column `warna` on the `barang_masuks` table. All the data in the column will be lost.
  - You are about to drop the `Imei` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kapasitas_id` to the `barang_masuks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodenegara_id` to the `barang_masuks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warna_id` to the `barang_masuks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `barang_masuks` DROP FOREIGN KEY `barang_masuks_imei_id_fkey`;

-- AlterTable
ALTER TABLE `barang_masuks` DROP COLUMN `kapasitas`,
    DROP COLUMN `kode_negara`,
    DROP COLUMN `warna`,
    ADD COLUMN `kapasitas_id` INTEGER NOT NULL,
    ADD COLUMN `kodenegara_id` INTEGER NOT NULL,
    ADD COLUMN `warna_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Imei`;

-- CreateTable
CREATE TABLE `imeis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imei` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `imeis_imei_key`(`imei`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kode_negaras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `kode_negaras_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warnas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `warnas_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kapasitas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `kapasitas_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `barang_masuks` ADD CONSTRAINT `barang_masuks_imei_id_fkey` FOREIGN KEY (`imei_id`) REFERENCES `imeis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `barang_masuks` ADD CONSTRAINT `barang_masuks_kodenegara_id_fkey` FOREIGN KEY (`kodenegara_id`) REFERENCES `kode_negaras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `barang_masuks` ADD CONSTRAINT `barang_masuks_warna_id_fkey` FOREIGN KEY (`warna_id`) REFERENCES `warnas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `barang_masuks` ADD CONSTRAINT `barang_masuks_kapasitas_id_fkey` FOREIGN KEY (`kapasitas_id`) REFERENCES `kapasitas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
