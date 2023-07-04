/*
  Warnings:

  - The primary key for the `Contrat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `beginDate` on the `Contrat` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Contrat` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Contrat` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Contrat` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Contrat` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Contrat` table. All the data in the column will be lost.
  - The primary key for the `Evaluation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Evaluation` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Tag` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_EvaluationToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoleToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `client_id` to the `Contrat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contrat_id` to the `Contrat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `Contrat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contrat_id` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluation_id` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formateur_id` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note_totale` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participant_id` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_id` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_EvaluationToTag` DROP FOREIGN KEY `_EvaluationToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_EvaluationToTag` DROP FOREIGN KEY `_EvaluationToTag_B_fkey`;

-- DropForeignKey
ALTER TABLE `_RoleToUser` DROP FOREIGN KEY `_RoleToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_RoleToUser` DROP FOREIGN KEY `_RoleToUser_B_fkey`;

-- AlterTable
ALTER TABLE `Contrat` DROP PRIMARY KEY,
    DROP COLUMN `beginDate`,
    DROP COLUMN `description`,
    DROP COLUMN `endDate`,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    DROP COLUMN `published`,
    ADD COLUMN `client_id` INTEGER NOT NULL,
    ADD COLUMN `contrat_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `theme` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`contrat_id`);

-- AlterTable
ALTER TABLE `Evaluation` DROP PRIMARY KEY,
    DROP COLUMN `description`,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    DROP COLUMN `published`,
    ADD COLUMN `commentaire` VARCHAR(191) NULL,
    ADD COLUMN `contrat_id` INTEGER NOT NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `evaluation_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `formateur_id` INTEGER NOT NULL,
    ADD COLUMN `note_totale` INTEGER NOT NULL,
    ADD COLUMN `participant_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`evaluation_id`);

-- AlterTable
ALTER TABLE `Role` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`role_id`);

-- AlterTable
ALTER TABLE `Tag` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `nom` VARCHAR(191) NOT NULL,
    ADD COLUMN `tag_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`tag_id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `role_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`user_id`);

-- DropTable
DROP TABLE `_EvaluationToTag`;

-- DropTable
DROP TABLE `_RoleToUser`;

-- CreateTable
CREATE TABLE `Evaluation_Item` (
    `evaluation_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `evaluation_id` INTEGER NOT NULL,
    `methode_item_id` INTEGER NOT NULL,
    `note` INTEGER NOT NULL,
    `commentaire` VARCHAR(191) NULL,

    PRIMARY KEY (`evaluation_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientEntreprise` (
    `client_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NULL,

    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contrat_Methode` (
    `contrat_methode_id` INTEGER NOT NULL AUTO_INCREMENT,
    `contrat_id` INTEGER NOT NULL,
    `methode_id` INTEGER NOT NULL,

    PRIMARY KEY (`contrat_methode_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Methode_Tag` (
    `methode_tag_id` INTEGER NOT NULL AUTO_INCREMENT,
    `methode_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    PRIMARY KEY (`methode_tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Methode` (
    `methode_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`methode_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Methode_Item` (
    `methode_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `methode_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,

    PRIMARY KEY (`methode_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_Note` (
    `item_note_id` INTEGER NOT NULL AUTO_INCREMENT,
    `evaluation_item_id` INTEGER NOT NULL,
    `evaluation_id` INTEGER NOT NULL,
    `note` INTEGER NOT NULL,
    `commentaire` VARCHAR(191) NULL,

    PRIMARY KEY (`item_note_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_formateur_id_fkey` FOREIGN KEY (`formateur_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_contrat_id_fkey` FOREIGN KEY (`contrat_id`) REFERENCES `Contrat`(`contrat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation_Item` ADD CONSTRAINT `Evaluation_Item_evaluation_id_fkey` FOREIGN KEY (`evaluation_id`) REFERENCES `Evaluation`(`evaluation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation_Item` ADD CONSTRAINT `Evaluation_Item_methode_item_id_fkey` FOREIGN KEY (`methode_item_id`) REFERENCES `Methode_Item`(`methode_item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrat` ADD CONSTRAINT `Contrat_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `ClientEntreprise`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrat_Methode` ADD CONSTRAINT `Contrat_Methode_contrat_id_fkey` FOREIGN KEY (`contrat_id`) REFERENCES `Contrat`(`contrat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrat_Methode` ADD CONSTRAINT `Contrat_Methode_methode_id_fkey` FOREIGN KEY (`methode_id`) REFERENCES `Methode`(`methode_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Methode_Tag` ADD CONSTRAINT `Methode_Tag_methode_id_fkey` FOREIGN KEY (`methode_id`) REFERENCES `Methode`(`methode_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Methode_Tag` ADD CONSTRAINT `Methode_Tag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`tag_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Methode_Item` ADD CONSTRAINT `Methode_Item_methode_id_fkey` FOREIGN KEY (`methode_id`) REFERENCES `Methode`(`methode_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Methode_Item` ADD CONSTRAINT `Methode_Item_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
