import { PrismaClient } from '@prisma/client';
import { CustomerType } from '../types/CustomerType';

const prisma = new PrismaClient();

class CustomerRepository {
  // Buscar todos os clientes de um tenant
  async findAll(tenantId: number): Promise<CustomerType[]> {
    return await prisma.customers.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Buscar um cliente por ID e tenant
  async findById(id: number, tenantId: number): Promise<CustomerType | null> {
    return await prisma.customers.findFirst({
      where: { id, tenantId },
    });
  }

  // Criar um novo cliente
  async create(data: Omit<CustomerType, 'id' | 'createdAt' | 'updatedAt'>): Promise<CustomerType> {
    return await prisma.customers.create({
      data,
    });
  }

  // Atualizar um cliente
  async update(
    id: number,
    tenantId: number,
    data: Partial<Omit<CustomerType, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>>
  ): Promise<CustomerType | null> {
    return await prisma.customers.update({
      where: { id },
      data,
    });
  }

  // Excluir um cliente
  async delete(id: number, tenantId: number): Promise<void> {
    await prisma.customers.delete({
      where: { id },
    });
  }
}

export default new CustomerRepository();