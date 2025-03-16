/*
  Warnings:

  - You are about to alter the column `tipe_pembelian` on the `barang_masuks` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `barang_masuks` MODIFY `tipe_pembelian` VARCHAR(191) NULL;
