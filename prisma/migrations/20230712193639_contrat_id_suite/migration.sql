/*
  Warnings:

  - You are about to drop the `_ContratToContrat_Methode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ContratToContrat_Methode` DROP FOREIGN KEY `_ContratToContrat_Methode_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ContratToContrat_Methode` DROP FOREIGN KEY `_ContratToContrat_Methode_B_fkey`;

-- DropIndex
DROP INDEX `Contrat_Methode_contrat_id_fkey` ON `Contrat_Methode`;

-- DropTable
DROP TABLE `_ContratToContrat_Methode`;

-- AddForeignKey
ALTER TABLE `Contrat_Methode` ADD CONSTRAINT `Contrat_Methode_contrat_id_fkey` FOREIGN KEY (`contrat_id`) REFERENCES `Contrat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
