/*
  Warnings:

  - You are about to drop the column `active` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `employees` table. All the data in the column will be lost.
  - Added the required column `name` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `employees_username_key` ON `employees`;

-- AlterTable
ALTER TABLE `employees` DROP COLUMN `active`,
    DROP COLUMN `fullName`,
    DROP COLUMN `password`,
    DROP COLUMN `role`,
    DROP COLUMN `username`,
    ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `document` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `passwordHash` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ALTER COLUMN `updatedAt` DROP DEFAULT;
