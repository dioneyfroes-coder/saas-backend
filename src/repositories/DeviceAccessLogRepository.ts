import { PrismaClient } from '@prisma/client';
import { DeviceAccessLogType } from '../types/DeviceAccessLogType';

const prisma = new PrismaClient();

class DeviceAccessLogRepository {
  // Buscar todos os logs de um dispositivo
  async findAllByDevice(
    deviceId: number,
    tenantId: number,
    limit: number,
    offset: number
  ): Promise<DeviceAccessLogType[]> {
    return await prisma.device_access_logs.findMany({
      where: { deviceId, tenantId },
      orderBy: { accessedAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  // Criar um novo log de acesso
  async create(data: Omit<DeviceAccessLogType, 'id' | 'accessedAt'>): Promise<DeviceAccessLogType> {
    return await prisma.device_access_logs.create({
      data,
    });
  }
}

export default new DeviceAccessLogRepository();