/*
  Warnings:

  - You are about to drop the column `document` on the `employees` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `employees` DROP COLUMN `document`;

-- CreateTable
CREATE TABLE `employee_documents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `type` ENUM('RG', 'CPF', 'CTPS', 'PIS', 'OUTRO') NOT NULL,
    `encryptedVal` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `employee_documents_employeeId_idx`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employee_documents` ADD CONSTRAINT `employee_documents_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
