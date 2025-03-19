-- CreateTable
CREATE TABLE `aksesoris` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penjualans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `no_hp` VARCHAR(191) NOT NULL,
    `catatan` VARCHAR(191) NOT NULL,
    `imei` VARCHAR(191) NOT NULL,
    `aksesoris_id` INTEGER NULL,
    `metode_bayar` VARCHAR(191) NOT NULL,
    `grand_total` VARCHAR(191) NOT NULL,
    `nota` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `penjualans_imei_key`(`imei`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `penjualans` ADD CONSTRAINT `penjualans_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penjualans` ADD CONSTRAINT `penjualans_aksesoris_id_fkey` FOREIGN KEY (`aksesoris_id`) REFERENCES `aksesoris`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
