import { PrismaClient } from "@prisma/client";
import { DeviceType } from "../types/DevicesType";

const prisma = new PrismaClient();

class DeviceRepository {
  async findAll(tenantId: number): Promise<DeviceType[]> {
    return await prisma.devices.findMany({
      where: { tenantId },
    });
  }

  async findById(id: number, tenantId: number): Promise<DeviceType | null> {
    return await prisma.devices.findFirst({
      where: { id, tenantId },
    });
  }

  async findByIdentificador(identificador: string, tenantId: number): Promise<DeviceType | null> {
    return await prisma.devices.findFirst({
      where: { identificador, tenantId },
    });
  }

  async create(data: Omit<DeviceType, "id" | "createdAt" | "updatedAt">): Promise<DeviceType> {
    return await prisma.devices.create({
      data,
    });
  }

  async update(
    id: number,
    tenantId: number,
    data: Partial<Omit<DeviceType, "id" | "createdAt" | "updatedAt">>
  ): Promise<DeviceType | null> {
    const device = await this.findById(id, tenantId);
    if (!device) throw new Error("Dispositivo não encontrado");

    return await prisma.devices.update({
      where: { id },
      data,
    });
  }

  async delete(id: number, tenantId: number): Promise<boolean> {
    const device = await this.findById(id, tenantId);
    if (!device) throw new Error("Dispositivo não encontrado");

    await prisma.devices.delete({
      where: { id },
    });
    return true;
  }
}

export default new DeviceRepository();