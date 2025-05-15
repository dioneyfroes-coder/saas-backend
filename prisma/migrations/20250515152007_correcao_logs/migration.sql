-- DropForeignKey
ALTER TABLE `device_access_logs` DROP FOREIGN KEY `device_access_logs_ibfk_1`;

-- AddForeignKey
ALTER TABLE `device_access_logs` ADD CONSTRAINT `device_access_logs_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `device_access_logs` RENAME INDEX `deviceId` TO `device_access_logs_deviceId_idx`;
