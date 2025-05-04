/*
  Warnings:

  - Added the required column `role` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employees` ADD COLUMN `role` ENUM('manager', 'hr', 'finance', 'supervisor', 'auditor', 'store_operator', 'cashier', 'stock_clerk', 'it', 'admin', 'super_admin', 'operator') NOT NULL;
