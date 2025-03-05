-- AlterTable
ALTER TABLE `barang_masuks` ADD COLUMN `jenis_pembelian` VARCHAR(191) NULL,
    ADD COLUMN `sales` VARCHAR(191) NULL,
    ADD COLUMN `tanggal_pembelian` DATETIME(3) NULL;
