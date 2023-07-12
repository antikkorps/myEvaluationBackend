-- DropForeignKey
ALTER TABLE `Contrat_Methode` DROP FOREIGN KEY `Contrat_Methode_contrat_id_fkey`;

-- CreateTable
CREATE TABLE `_ContratToContrat_Methode` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContratToContrat_Methode_AB_unique`(`A`, `B`),
    INDEX `_ContratToContrat_Methode_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ContratToContrat_Methode` ADD CONSTRAINT `_ContratToContrat_Methode_A_fkey` FOREIGN KEY (`A`) REFERENCES `Contrat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContratToContrat_Methode` ADD CONSTRAINT `_ContratToContrat_Methode_B_fkey` FOREIGN KEY (`B`) REFERENCES `Contrat_Methode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
