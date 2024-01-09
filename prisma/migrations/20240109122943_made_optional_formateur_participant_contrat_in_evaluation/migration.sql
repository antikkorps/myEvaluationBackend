-- DropForeignKey
ALTER TABLE `evaluations` DROP FOREIGN KEY `evaluations_contrat_id_fkey`;

-- DropForeignKey
ALTER TABLE `evaluations` DROP FOREIGN KEY `evaluations_formateur_id_fkey`;

-- DropForeignKey
ALTER TABLE `evaluations` DROP FOREIGN KEY `evaluations_participant_id_fkey`;

-- AlterTable
ALTER TABLE `evaluations` MODIFY `formateur_id` VARCHAR(191) NULL,
    MODIFY `participant_id` VARCHAR(191) NULL,
    MODIFY `contrat_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_formateur_id_fkey` FOREIGN KEY (`formateur_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_contrat_id_fkey` FOREIGN KEY (`contrat_id`) REFERENCES `contrats`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
