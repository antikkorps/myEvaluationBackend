/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `username`,
    MODIFY `name` VARCHAR(255) NULL,
    MODIFY `firstName` VARCHAR(255) NULL,
    MODIFY `fonction` VARCHAR(255) NULL;
