/*
  Warnings:

  - You are about to drop the column `evaluation_id` on the `evaluation_commentaires` table. All the data in the column will be lost.
  - You are about to drop the `item_notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `evaluation_commentaires` DROP COLUMN `evaluation_id`;

-- DropTable
DROP TABLE `item_notes`;
