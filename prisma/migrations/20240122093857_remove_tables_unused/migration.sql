/*
  Warnings:

  - You are about to drop the `evaluation_commentaires` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evaluation_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `methode_items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `evaluation_commentaires` DROP FOREIGN KEY `evaluation_commentaires_evaluation_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `evaluation_commentaires` DROP FOREIGN KEY `evaluation_commentaires_lastUpdateBy_id_fkey`;

-- DropForeignKey
ALTER TABLE `evaluation_items` DROP FOREIGN KEY `evaluation_items_evaluation_id_fkey`;

-- DropForeignKey
ALTER TABLE `evaluation_items` DROP FOREIGN KEY `evaluation_items_methode_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `methode_items` DROP FOREIGN KEY `methode_items_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `methode_items` DROP FOREIGN KEY `methode_items_methode_id_fkey`;

-- AlterTable
ALTER TABLE `field_values` ADD COLUMN `evaluation_id` INTEGER NULL;

-- DropTable
DROP TABLE `evaluation_commentaires`;

-- DropTable
DROP TABLE `evaluation_items`;

-- DropTable
DROP TABLE `items`;

-- DropTable
DROP TABLE `methode_items`;

-- AddForeignKey
ALTER TABLE `field_values` ADD CONSTRAINT `field_values_evaluation_id_fkey` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
