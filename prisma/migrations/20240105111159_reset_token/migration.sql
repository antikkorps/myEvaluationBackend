-- AlterTable
ALTER TABLE `users` ADD COLUMN `resetToken` VARCHAR(255) NULL,
    ADD COLUMN `resetTokenExpiry` DATETIME(3) NULL;
