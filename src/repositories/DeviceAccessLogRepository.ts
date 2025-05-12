//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\repositories\DeviceAccessLogRepository.ts
import { PrismaClient } from '@prisma/client';
import { DeviceAccessLogType } from '../types/DeviceAccessLogType';

const prisma = new PrismaClient();

class DeviceAccessLogRepository {
  // Verificar se o dispositivo existe
  async deviceExists(deviceId: number): Promise<boolean> {
    const device = await prisma.devices.findUnique({
      where: { id: deviceId },
    });
    return !!device; // Retorna true se o dispositivo existir
  }

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

  async findByIdentificador(identificador: number): Promise<DeviceAccessLogType | null> {
    return await prisma.device_access_logs.findUnique({
      where: { id: identificador },
    });
  }

  // Criar um novo log de acesso
  async create(data: Omit<DeviceAccessLogType, 'id' | 'accessedAt'>): Promise<DeviceAccessLogType> {
    // Valida se o dispositivo existe antes de criar o log
    const exists = await this.deviceExists(data.deviceId);
    if (!exists) {
      throw new Error('Dispositivo não encontrado.');
    }

    return await prisma.device_access_logs.create({
      data,
    });
  };
};

export default new DeviceAccessLogRepository();