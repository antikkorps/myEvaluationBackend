/*
  Warnings:

  - Added the required column `description` to the `Contrat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Contrat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contrat` ADD COLUMN `begin_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `end_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false;
