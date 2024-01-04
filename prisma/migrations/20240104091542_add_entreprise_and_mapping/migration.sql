/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contrat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contrat_Methode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Evaluation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Evaluation_Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item_Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Methode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Methode_Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Methode_Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Contrat` DROP FOREIGN KEY `Contrat_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `Contrat_Methode` DROP FOREIGN KEY `Contrat_Methode_contrat_id_fkey`;

-- DropForeignKey
ALTER TABLE `Contrat_Methode` DROP FOREIGN KEY `Contrat_Methode_methode_id_fkey`;

-- DropForeignKey
ALTER TABLE `Evaluation` DROP FOREIGN KEY `Evaluation_contrat_id_fkey`;

-- DropForeignKey
ALTER TABLE `Evaluation` DROP FOREIGN KEY `Evaluation_formateur_id_fkey`;

-- DropForeignKey
ALTER TABLE `Evaluation` DROP FOREIGN KEY `Evaluation_participant_id_fkey`;

-- DropForeignKey
ALTER TABLE `Evaluation_Item` DROP FOREIGN KEY `Evaluation_Item_evaluation_id_fkey`;

-- DropForeignKey
ALTER TABLE `Evaluation_Item` DROP FOREIGN KEY `Evaluation_Item_methode_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `Methode_Item` DROP FOREIGN KEY `Methode_Item_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `Methode_Item` DROP FOREIGN KEY `Methode_Item_methode_id_fkey`;

-- DropForeignKey
ALTER TABLE `Methode_Tag` DROP FOREIGN KEY `Methode_Tag_methode_id_fkey`;

-- DropForeignKey
ALTER TABLE `Methode_Tag` DROP FOREIGN KEY `Methode_Tag_tag_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_role_id_fkey`;

-- DropTable
DROP TABLE `Client`;

-- DropTable
DROP TABLE `Contrat`;

-- DropTable
DROP TABLE `Contrat_Methode`;

-- DropTable
DROP TABLE `Evaluation`;

-- DropTable
DROP TABLE `Evaluation_Item`;

-- DropTable
DROP TABLE `Item`;

-- DropTable
DROP TABLE `Item_Note`;

-- DropTable
DROP TABLE `Methode`;

-- DropTable
DROP TABLE `Methode_Item`;

-- DropTable
DROP TABLE `Methode_Tag`;

-- DropTable
DROP TABLE `Role`;

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `fonction` VARCHAR(255) NOT NULL,
    `entreprise_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    INDEX `email`(`email`),
    INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NOT NULL,

    INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evaluations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `formateur_id` INTEGER NOT NULL,
    `participant_id` INTEGER NOT NULL,
    `note_globale` INTEGER NOT NULL DEFAULT 0,
    `commentaire` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `contrat_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evaluation_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `evaluation_id` INTEGER NOT NULL,
    `methode_item_id` INTEGER NOT NULL,
    `note` INTEGER NOT NULL,
    `commentaire` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evaluation_commentaires` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `evaluation_id` INTEGER NOT NULL,
    `commentaire` VARCHAR(191) NULL,
    `evaluation_item_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entreprises` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `zipcode` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contrats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `begin_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `theme` VARCHAR(191) NOT NULL,
    `client_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contrat_methodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contrat_id` INTEGER NOT NULL,
    `methode_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `methode_tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `methode_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `methodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `methode_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `methode_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `evaluation_item_id` INTEGER NOT NULL,
    `evaluation_id` INTEGER NOT NULL,
    `note` INTEGER NOT NULL,
    `commentaire` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_entreprise_id_fkey` FOREIGN KEY (`entreprise_id`) REFERENCES `entreprises`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_formateur_id_fkey` FOREIGN KEY (`formateur_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_contrat_id_fkey` FOREIGN KEY (`contrat_id`) REFERENCES `contrats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluation_items` ADD CONSTRAINT `evaluation_items_evaluation_id_fkey` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluation_items` ADD CONSTRAINT `evaluation_items_methode_item_id_fkey` FOREIGN KEY (`methode_item_id`) REFERENCES `methode_items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluation_commentaires` ADD CONSTRAINT `evaluation_commentaires_evaluation_item_id_fkey` FOREIGN KEY (`evaluation_item_id`) REFERENCES `evaluation_items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contrats` ADD CONSTRAINT `contrats_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `entreprises`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contrat_methodes` ADD CONSTRAINT `contrat_methodes_contrat_id_fkey` FOREIGN KEY (`contrat_id`) REFERENCES `contrats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contrat_methodes` ADD CONSTRAINT `contrat_methodes_methode_id_fkey` FOREIGN KEY (`methode_id`) REFERENCES `methodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `methode_tags` ADD CONSTRAINT `methode_tags_methode_id_fkey` FOREIGN KEY (`methode_id`) REFERENCES `methodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `methode_tags` ADD CONSTRAINT `methode_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `methode_items` ADD CONSTRAINT `methode_items_methode_id_fkey` FOREIGN KEY (`methode_id`) REFERENCES `methodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `methode_items` ADD CONSTRAINT `methode_items_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
