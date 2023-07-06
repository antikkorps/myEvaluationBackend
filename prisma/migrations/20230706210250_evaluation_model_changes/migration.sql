/*
  Warnings:

  - You are about to drop the column `note_totale` on the `Evaluation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Evaluation` DROP COLUMN `note_totale`,
    ADD COLUMN `note_globale` INTEGER NOT NULL DEFAULT 0;
