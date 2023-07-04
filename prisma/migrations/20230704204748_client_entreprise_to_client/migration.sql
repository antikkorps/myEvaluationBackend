/*
  Warnings:

  - You are about to drop the `ClientEntreprise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Contrat` DROP FOREIGN KEY `Contrat_client_id_fkey`;

-- DropTable
DROP TABLE `ClientEntreprise`;

-- CreateTable
CREATE TABLE `Client` (
    `client_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `zipcode` VARCHAR(191) NULL,

    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contrat` ADD CONSTRAINT `Contrat_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
