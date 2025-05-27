/*
  Warnings:

  - Added the required column `kode_negara` to the `barang_masuks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barang_masuks` ADD COLUMN `kode_negara` VARCHAR(191) NOT NULL;
