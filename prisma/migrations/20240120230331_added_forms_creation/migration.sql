-- CreateTable
CREATE TABLE `forms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fields` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('TEXT', 'TEXTAREA', 'RADIO', 'CHECKBOX', 'SELECT', 'DATE', 'TIME', 'DATETIME', 'EMAIL', 'NUMBER', 'PASSWORD', 'FILE', 'HIDDEN', 'COLOR', 'RANGE', 'TEL', 'URL', 'SEARCH', 'MONTH', 'WEEK', 'IMAGE', 'BUTTON', 'SUBMIT', 'RESET') NOT NULL DEFAULT 'TEXT',
    `label` VARCHAR(191) NULL,
    `form_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `field_values` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(191) NULL,
    `field_id` INTEGER NOT NULL,
    `form_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `forms` ADD CONSTRAINT `forms_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fields` ADD CONSTRAINT `fields_form_id_fkey` FOREIGN KEY (`form_id`) REFERENCES `forms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `field_values` ADD CONSTRAINT `field_values_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `field_values` ADD CONSTRAINT `field_values_form_id_fkey` FOREIGN KEY (`form_id`) REFERENCES `forms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
