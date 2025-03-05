/*
  Warnings:

  - You are about to alter the column `harga_pembelian` on the `barang_masuks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `barang_masuks` MODIFY `harga_pembelian` DOUBLE NOT NULL;
