/*
  Warnings:

  - Added the required column `lastUpdateBy_id` to the `evaluation_commentaires` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `evaluation_commentaires` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastUpdateBy_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `evaluation_commentaires` ADD CONSTRAINT `evaluation_commentaires_lastUpdateBy_id_fkey` FOREIGN KEY (`lastUpdateBy_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
