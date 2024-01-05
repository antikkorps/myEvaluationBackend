/*
  Warnings:

  - You are about to drop the column `role_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_entreprise_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_role_id_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `role_id`,
    ADD COLUMN `role` ENUM('USER', 'ADMIN', 'MANAGER', 'FORMATEUR', 'PARTICIPANT') NOT NULL DEFAULT 'USER',
    MODIFY `entreprise_id` INTEGER NULL;

-- DropTable
DROP TABLE `roles`;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_entreprise_id_fkey` FOREIGN KEY (`entreprise_id`) REFERENCES `entreprises`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
