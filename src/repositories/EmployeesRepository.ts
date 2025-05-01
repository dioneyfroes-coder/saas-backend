import { PrismaClient } from '@prisma/client';
import { EmployeeType } from '../types/EmployeeType';

const prisma = new PrismaClient();

class EmployeesRepository {
  // Buscar todos os funcionários de um tenant
  async findAll(tenantId: number): Promise<EmployeeType[]> {
    return await prisma.employees.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Buscar um funcionário por ID e tenant
  async findById(id: number, tenantId: number): Promise<EmployeeType | null> {
    return await prisma.employees.findFirst({
      where: { id, tenantId },
    });
  }

  // Criar um novo funcionário
  async create(data: Omit<EmployeeType, 'id' | 'createdAt' | 'updatedAt'>): Promise<EmployeeType> {
    return await prisma.employees.create({
      data,
    });
  }

  // Atualizar um funcionário
  async update(
    id: number,
    tenantId: number,
    data: Partial<Omit<EmployeeType, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>>
  ): Promise<EmployeeType | null> {
    return await prisma.employees.update({
      where: { id },
      data,
    });
  }

  // Excluir um funcionário
  async delete(id: number, tenantId: number): Promise<void> {
    await prisma.employees.delete({
      where: { id },
    });
  }
}

export default new EmployeesRepository();