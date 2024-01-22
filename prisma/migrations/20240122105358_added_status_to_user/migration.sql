-- AlterTable
ALTER TABLE `forms` ADD COLUMN `methode_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `status` ENUM('FREE', 'PAID', 'CANCELED') NOT NULL DEFAULT 'FREE';

-- AddForeignKey
ALTER TABLE `forms` ADD CONSTRAINT `forms_methode_id_fkey` FOREIGN KEY (`methode_id`) REFERENCES `methodes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
