//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\repositories\DeviceRepository.ts
import { PrismaClient } from '@prisma/client';
import { DeviceType } from '../types/DevicesType';

const prisma = new PrismaClient();

class DeviceRepository {
  // Buscar todos os dispositivos
  async findAll(): Promise<DeviceType[]> {
    const devices = await prisma.devices.findMany({
      orderBy: { id: 'asc' },
    });

    return devices.map(device => ({
      ...device,
      tipo: device.tipo as DeviceType['tipo'],
    }));
  }

  // Buscar dispositivo por ID
  async findById(id: number): Promise<DeviceType | null> {
    return await prisma.devices.findUnique({
      where: { id },
    });
  }

  // Buscar dispositivo por identificador
  async findByIdentificador(identificador: string): Promise<DeviceType | null> {
    return await prisma.devices.findUnique({
      where: { identificador },
    });
  }

  // Criar um novo dispositivo
  async create(data: Omit<DeviceType, 'id' | 'createdAt' | 'updatedAt'>): Promise<DeviceType> {
    return await prisma.devices.create({
      data,
    });
  }

  // Atualizar um dispositivo
  async update(
    id: number,
    data: Partial<Omit<DeviceType, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<DeviceType | null> {
    const device = await this.findById(id);
    if (!device) throw new Error('Dispositivo não encontrado');

    return await prisma.devices.update({
      where: { id },
      data,
    });
  }

  // Atualizar o token de um dispositivo
  async updateToken(identificador: string, token: string): Promise<DeviceType | null> {
    return await prisma.devices.update({
      where: { identificador },
      data: { token },
    });
  }

  // Excluir um dispositivo
  async delete(id: number): Promise<boolean> {
    const device = await this.findById(id);
    if (!device) throw new Error('Dispositivo não encontrado');

    await prisma.devices.delete({
      where: { id },
    });
    return true;
  }
}

export default new DeviceRepository();