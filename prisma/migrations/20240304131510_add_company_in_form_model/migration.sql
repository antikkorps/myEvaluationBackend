-- AlterTable
ALTER TABLE `forms` ADD COLUMN `company_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `forms` ADD CONSTRAINT `forms_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
