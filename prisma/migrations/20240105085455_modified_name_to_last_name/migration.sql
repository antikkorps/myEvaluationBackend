/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `name` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `name`,
    ADD COLUMN `lastName` VARCHAR(255) NULL;

-- CreateIndex
CREATE INDEX `lastName` ON `users`(`lastName`);
