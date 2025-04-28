import DeviceAccessLogRepository from '../repositories/DeviceAccessLogRepository.js';
import { DeviceAccessLogType } from '../types/DeviceAccessLogType';

const DeviceAccessLogService = {
  // Buscar logs de acesso por dispositivo
  async getLogsByDevice(
    deviceId: number,
    tenantId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<DeviceAccessLogType[]> {
    const offset = (page - 1) * limit;
    return await DeviceAccessLogRepository.findAllByDevice(deviceId, tenantId, limit, offset);
  },

  // Criar um novo log de acesso
  async createLog(data: Omit<DeviceAccessLogType, 'id' | 'accessedAt'>): Promise<DeviceAccessLogType> {
    return await DeviceAccessLogRepository.create(data);
  },
};

export default DeviceAccessLogService;