/*
  Warnings:

  - You are about to drop the `contrat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `contrat`;

-- CreateTable
CREATE TABLE `contrats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `published` BOOLEAN NULL DEFAULT false,
    `beginDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
