/*
  Warnings:

  - You are about to drop the column `tenantId` on the `device_access_logs` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `sale_items` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `sale_items` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `finance_records` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventory_movements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stockId` to the `sale_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `customers` DROP FOREIGN KEY `customers_ibfk_1`;

-- DropForeignKey
ALTER TABLE `device_access_logs` DROP FOREIGN KEY `device_access_logs_ibfk_2`;

-- DropForeignKey
ALTER TABLE `devices` DROP FOREIGN KEY `devices_ibfk_1`;

-- DropForeignKey
ALTER TABLE `devices` DROP FOREIGN KEY `devices_ibfk_2`;

-- DropForeignKey
ALTER TABLE `finance_records` DROP FOREIGN KEY `finance_records_ibfk_1`;

-- DropForeignKey
ALTER TABLE `finance_records` DROP FOREIGN KEY `finance_records_ibfk_2`;

-- DropForeignKey
ALTER TABLE `inventories` DROP FOREIGN KEY `inventories_ibfk_1`;

-- DropForeignKey
ALTER TABLE `inventories` DROP FOREIGN KEY `inventories_ibfk_2`;

-- DropForeignKey
ALTER TABLE `inventory_movements` DROP FOREIGN KEY `inventory_movements_ibfk_1`;

-- DropForeignKey
ALTER TABLE `inventory_movements` DROP FOREIGN KEY `inventory_movements_ibfk_2`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_ibfk_1`;

-- DropForeignKey
ALTER TABLE `sale_items` DROP FOREIGN KEY `sale_items_ibfk_2`;

-- DropForeignKey
ALTER TABLE `sale_items` DROP FOREIGN KEY `sale_items_ibfk_3`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `sales_ibfk_1`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `sales_ibfk_2`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;

-- DropIndex
DROP INDEX `tenantId` ON `device_access_logs`;

-- DropIndex
DROP INDEX `tenantId` ON `devices`;

-- DropIndex
DROP INDEX `userId` ON `devices`;

-- DropIndex
DROP INDEX `productId` ON `sale_items`;

-- DropIndex
DROP INDEX `tenantId` ON `sale_items`;

-- DropIndex
DROP INDEX `tenantId` ON `sales`;

-- DropIndex
DROP INDEX `userId` ON `sales`;

-- AlterTable
ALTER TABLE `device_access_logs` DROP COLUMN `tenantId`;

-- AlterTable
ALTER TABLE `devices` DROP COLUMN `tenantId`,
    DROP COLUMN `userId`,
    ADD COLUMN `employeesId` INTEGER NULL,
    MODIFY `tipo` ENUM('estoque', 'pdv', 'admin', 'financeiro', 'rh', 'outro') NULL DEFAULT 'outro';

-- AlterTable
ALTER TABLE `sale_items` DROP COLUMN `productId`,
    DROP COLUMN `tenantId`,
    ADD COLUMN `stockId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sales` DROP COLUMN `tenantId`,
    DROP COLUMN `userId`,
    ADD COLUMN `employeesId` INTEGER NULL;

-- DropTable
DROP TABLE `customers`;

-- DropTable
DROP TABLE `finance_records`;

-- DropTable
DROP TABLE `inventories`;

-- DropTable
DROP TABLE `inventory_movements`;

-- DropTable
DROP TABLE `products`;

-- DropTable
DROP TABLE `tenants`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `barcode` VARCHAR(255) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `price` DECIMAL(10, 2) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `stock_barcode_key`(`barcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `finance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL,
    `type` ENUM('income', 'expense') NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `date` DATE NOT NULL,
    `category` ENUM('rent', 'sales', 'marketing', 'other') NOT NULL,
    `note` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `fullName` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('manager', 'hr', 'finance', 'supervisor', 'auditor', 'operator') NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `employees_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `employeesId` ON `devices`(`employeesId`);

-- CreateIndex
CREATE INDEX `stockId` ON `sale_items`(`stockId`);

-- CreateIndex
CREATE INDEX `employeesId` ON `sales`(`employeesId`);

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`employeesId`) REFERENCES `employees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale_items` ADD CONSTRAINT `sale_items_ibfk_2` FOREIGN KEY (`stockId`) REFERENCES `stock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `devices` ADD CONSTRAINT `devices_ibfk_2` FOREIGN KEY (`employeesId`) REFERENCES `employees`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;
