//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\repositories\DeviceAccessLogRepository.ts
import { Prisma, PrismaClient } from '@prisma/client';
import { DeviceAccessLogType } from '../types/DeviceAccessLogType';

const prisma = new PrismaClient();

class DeviceAccessLogRepository {
  async findAll(limit: number, offset: number): Promise<DeviceAccessLogType[]> {
    return prisma.device_access_logs.findMany({
      take: limit,
      skip: offset,
      orderBy: { accessedAt: 'desc' },
    });
  }

  async deviceExists(deviceId: number): Promise<boolean> {
    return !!(await prisma.devices.findUnique({
      where: { id: deviceId },
    }));
  }

  async findAllByDevice(
    deviceId: number,
    limit: number,
    offset: number
  ): Promise<DeviceAccessLogType[]> {
    return prisma.device_access_logs.findMany({
      where: { deviceId },
      orderBy: { accessedAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async findByIdentificador(identificador: number): Promise<DeviceAccessLogType | null> {
    return prisma.device_access_logs.findUnique({
      where: { id: identificador },
    });
  }

  async create(data: {
    deviceId: number;
    accessedAt: Date;
    ip?: string;
    userAgent?: string;
  }): Promise<DeviceAccessLogType> {
    return prisma.device_access_logs.create({
      data: {
        accessedAt: data.accessedAt,
        ip: data.ip,
        userAgent: data.userAgent,
        device: {
          connect: { id: data.deviceId },
        },
      },
    });
  }
}

export default new DeviceAccessLogRepository();