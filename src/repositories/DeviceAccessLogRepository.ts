//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\repositories\DeviceAccessLogRepository.ts
import { PrismaClient } from '@prisma/client';
import { DeviceAccessLogType } from '../types/DeviceAccessLogType';

const prisma = new PrismaClient();

class DeviceAccessLogRepository {
  // Buscar todos os logs de um dispositivo, com paginação
  async findAllByDevice(
    deviceId: number,
    limit: number,
    offset: number
  ): Promise<DeviceAccessLogType[]> {
    return await prisma.device_access_logs.findMany({
      where: { deviceId },
      orderBy: { accessedAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  // Criar um novo log de acesso
  async create(data: Omit<DeviceAccessLogType, 'id' | 'accessedAt'>): Promise<DeviceAccessLogType> {
    // Se for necessário armazenar accessedAt do lado do servidor, podemos omitir do data
    return await prisma.device_access_logs.create({
      data,
    });
  }
}

export default new DeviceAccessLogRepository();