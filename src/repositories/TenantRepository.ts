import { PrismaClient } from "@prisma/client";
import { TenantType } from "../types/TenantType";

const prisma = new PrismaClient();

class TenantRepository {
  // Buscar todos os tenants
  async findAll(): Promise<TenantType[]> {
    return await prisma.tenants.findMany();
  }

  // Buscar um tenant por ID
  async findById(id: number): Promise<TenantType | null> {
    return await prisma.tenants.findUnique({
      where: { id },
    });
  }

  // Criar um novo tenant
  async create(data: Omit<TenantType, "id" | "createdAt" | "updatedAt">): Promise<TenantType> {
    return await prisma.tenants.create({
      data,
    });
  }

  // Atualizar um tenant
  async update(id: number, data: Partial<Omit<TenantType, "id" | "createdAt" | "updatedAt">>): Promise<TenantType | null> {
    const tenant = await this.findById(id);
    if (!tenant) throw new Error("Tenant not found");

    return await prisma.tenants.update({
      where: { id },
      data,
    });
  }

  // Excluir um tenant
  async delete(id: number): Promise<boolean> {
    const tenant = await this.findById(id);
    if (!tenant) throw new Error("Tenant not found");

    await prisma.tenants.delete({
      where: { id },
    });
    return true;
  }
}

export default new TenantRepository();