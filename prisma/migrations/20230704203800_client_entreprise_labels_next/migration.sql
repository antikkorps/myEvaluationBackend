/*
  Warnings:

  - You are about to drop the column `adress` on the `ClientEntreprise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ClientEntreprise` DROP COLUMN `adress`,
    ADD COLUMN `address` VARCHAR(191) NULL;
