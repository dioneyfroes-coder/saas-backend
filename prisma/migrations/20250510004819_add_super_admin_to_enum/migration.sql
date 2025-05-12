/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `employees` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `devices` MODIFY `tipo` ENUM('estoque', 'pdv', 'admin', 'super_admin', 'financeiro', 'rh', 'totem', 'terminal_preco', 'pc_financeiro', 'pc_rh', 'pc_gerencia', 'pc_atendimento', 'outro') NULL DEFAULT 'outro';

-- AlterTable
ALTER TABLE `employees` MODIFY `email` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `employees_email_key` ON `employees`(`email`);
