/*
  Warnings:

  - You are about to drop the `Barang_masuk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Handphone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Barang_masuk` DROP FOREIGN KEY `Barang_masuk_handphone_id_fkey`;

-- DropForeignKey
ALTER TABLE `Barang_masuk` DROP FOREIGN KEY `Barang_masuk_supplier_id_fkey`;

-- DropTable
DROP TABLE `Barang_masuk`;

-- DropTable
DROP TABLE `Handphone`;

-- DropTable
DROP TABLE `categories`;

-- CreateTable
CREATE TABLE `suppliers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `no_hp` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `suppliers_kode_key`(`kode`),
    UNIQUE INDEX `suppliers_no_hp_key`(`no_hp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `handphones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `barang_masuks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplier_id` INTEGER NOT NULL,
    `imei` VARCHAR(191) NOT NULL,
    `handphone_id` INTEGER NOT NULL,
    `harga_pembelian` VARCHAR(191) NOT NULL,
    `catatan_awal` VARCHAR(191) NOT NULL,
    `catatan_selesai` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `barang_masuks_imei_key`(`imei`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `barang_masuks` ADD CONSTRAINT `barang_masuks_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `barang_masuks` ADD CONSTRAINT `barang_masuks_handphone_id_fkey` FOREIGN KEY (`handphone_id`) REFERENCES `handphones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
