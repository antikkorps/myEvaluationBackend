/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `client_id` on the `Client` table. All the data in the column will be lost.
  - The primary key for the `Contrat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contrat_id` on the `Contrat` table. All the data in the column will be lost.
  - The primary key for the `Contrat_Methode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contrat_methode_id` on the `Contrat_Methode` table. All the data in the column will be lost.
  - The primary key for the `Evaluation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `evaluation_id` on the `Evaluation` table. All the data in the column will be lost.
  - The primary key for the `Evaluation_Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `evaluation_item_id` on the `Evaluation_Item` table. All the data in the column will be lost.
  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `item_id` on the `Item` table. All the data in the column will be lost.
  - The primary key for the `Item_Note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `item_note_id` on the `Item_Note` table. All the data in the column will be lost.
  - The primary key for the `Methode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `methode_id` on the `Methode` table. All the data in the column will be lost.
  - The primary key for the `Methode_Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `methode_item_id` on the `Methode_Item` table. All the data in the column will be lost.
  - The primary key for the `Methode_Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `methode_tag_id` on the `Methode_Tag` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role_id` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tag_id` on the `Tag` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `id` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Contrat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Contrat_Methode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Evaluation_Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Item_Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Methode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Methode_Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Methode_Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

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

-- AlterTable
ALTER TABLE `Client` DROP PRIMARY KEY,
    DROP COLUMN `client_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Contrat` DROP PRIMARY KEY,
    DROP COLUMN `contrat_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Contrat_Methode` DROP PRIMARY KEY,
    DROP COLUMN `contrat_methode_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Evaluation` DROP PRIMARY KEY,
    DROP COLUMN `evaluation_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Evaluation_Item` DROP PRIMARY KEY,
    DROP COLUMN `evaluation_item_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Item` DROP PRIMARY KEY,
    DROP COLUMN `item_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Item_Note` DROP PRIMARY KEY,
    DROP COLUMN `item_note_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Methode` DROP PRIMARY KEY,
    DROP COLUMN `methode_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Methode_Item` DROP PRIMARY KEY,
    DROP COLUMN `methode_item_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Methode_Tag` DROP PRIMARY KEY,
    DROP COLUMN `methode_tag_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Role` DROP PRIMARY KEY,
    DROP COLUMN `role_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Tag` DROP PRIMARY KEY,
    DROP COLUMN `tag_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_formateur_id_fkey` FOREIGN KEY (`formateur_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_contrat_id_fkey` FOREIGN KEY (`contrat_id`) REFERENCES `Contrat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation_Item` ADD CONSTRAINT `Evaluation_Item_evaluation_id_fkey` FOREIGN KEY (`evaluation_id`) REFERENCES `Evaluation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation_Item` ADD CONSTRAINT `Evaluation_Item_methode_item_id_fkey` FOREIGN KEY (`methode_item_id`) REFERENCES `Methode_Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrat` ADD CONSTRAINT `Contrat_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrat_Methode` ADD CONSTRAINT `Contrat_Methode_contrat_id_fkey` FOREIGN KEY (`contrat_id`) REFERENCES `Contrat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrat_Methode` ADD CONSTRAINT `Contrat_Methode_methode_id_fkey` FOREIGN KEY (`methode_id`) REFERENCES `Methode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Methode_Tag` ADD CONSTRAINT `Methode_Tag_methode_id_fkey` FOREIGN KEY (`methode_id`) REFERENCES `Methode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Methode_Tag` ADD CONSTRAINT `Methode_Tag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Methode_Item` ADD CONSTRAINT `Methode_Item_methode_id_fkey` FOREIGN KEY (`methode_id`) REFERENCES `Methode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Methode_Item` ADD CONSTRAINT `Methode_Item_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
