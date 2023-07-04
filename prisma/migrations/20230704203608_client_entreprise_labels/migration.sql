/*
  Warnings:

  - You are about to drop the column `adresse` on the `ClientEntreprise` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `ClientEntreprise` table. All the data in the column will be lost.
  - Added the required column `name` to the `ClientEntreprise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ClientEntreprise` DROP COLUMN `adresse`,
    DROP COLUMN `nom`,
    ADD COLUMN `adress` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
