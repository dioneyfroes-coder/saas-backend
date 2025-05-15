//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\services\DeviceAccessLogService.ts
import DeviceAccessLogRepository from '../repositories/DeviceAccessLogRepository';
import { DeviceAccessLogType } from '../types/DeviceAccessLogType';
import { getLocalDateAsUTC } from '../utils/getLocalDateAsUTC';

const DeviceAccessLogService = {
  async getLogsByDevice(
    deviceId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<DeviceAccessLogType[]> {
    const offset = (page - 1) * limit;
    return DeviceAccessLogRepository.findAllByDevice(deviceId, limit, offset);
  },

  async getAllLogs(
    page: number = 1,
    limit: number = 10
  ): Promise<DeviceAccessLogType[]> {
    const offset = (page - 1) * limit;
    return DeviceAccessLogRepository.findAll(limit, offset);
  },

  async createLog(data: {
    deviceId: number;
    accessedAt?: Date;
    ip?: string;
    userAgent?: string;
  }): Promise<DeviceAccessLogType> {
    const logData = {
      deviceId: data.deviceId,
      accessedAt: data.accessedAt || getLocalDateAsUTC(),
      ip: data.ip,
      userAgent: data.userAgent,
    };

    return DeviceAccessLogRepository.create(logData);
  },
};

export default DeviceAccessLogService;