/*
  Warnings:

  - The values [PARTICIPANT] on the enum `users_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('USER', 'ADMIN', 'MANAGER', 'FORMATEUR', 'CLIENT_PARTICIPANT', 'CLIENT_MANAGER') NOT NULL DEFAULT 'USER';
