-- AlterTable
ALTER TABLE `users` MODIFY `status` ENUM('FREE', 'PAID', 'PREMIUM', 'CANCELED') NOT NULL DEFAULT 'FREE';
