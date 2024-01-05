/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `evaluations` DROP FOREIGN KEY `evaluations_formateur_id_fkey`;

-- DropForeignKey
ALTER TABLE `evaluations` DROP FOREIGN KEY `evaluations_participant_id_fkey`;

-- AlterTable
ALTER TABLE `evaluations` MODIFY `formateur_id` VARCHAR(191) NOT NULL,
    MODIFY `participant_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_formateur_id_fkey` FOREIGN KEY (`formateur_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
