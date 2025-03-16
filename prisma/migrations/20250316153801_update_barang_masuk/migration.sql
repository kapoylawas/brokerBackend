-- AlterTable
ALTER TABLE `barang_masuks` ADD COLUMN `tipe_pembelian` ENUM('LUNAS', 'HUTANG') NOT NULL DEFAULT 'LUNAS';
