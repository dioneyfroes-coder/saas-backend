//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\services\DeviceAccessLogService.ts
import DeviceAccessLogRepository from '../repositories/DeviceAccessLogRepository';
import { DeviceAccessLogType } from '../types/DeviceAccessLogType';

const DeviceAccessLogService = {
  // Buscar logs de acesso por dispositivo
  async getLogsByDevice(
    deviceId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<DeviceAccessLogType[]> {
    const offset = (page - 1) * limit;
    return await DeviceAccessLogRepository.findAllByDevice(deviceId, limit, offset);
  },

  // Criar um novo log de acesso
  async createLog(data: Omit<DeviceAccessLogType, 'id' | 'accessedAt'>): Promise<DeviceAccessLogType> {
    return await DeviceAccessLogRepository.create(data);
  },
};

export default DeviceAccessLogService;