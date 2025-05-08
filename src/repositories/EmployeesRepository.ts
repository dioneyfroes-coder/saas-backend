//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\repositories\EmployeesRepository.ts
import { PrismaClient, Role } from '@prisma/client';
import { EmployeeType } from '../types/EmployeeType';

const prisma = new PrismaClient();

class EmployeesRepository {
  // Buscar todos os funcionários
  async findAll(): Promise<EmployeeType[]> {
    return prisma.employees.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Buscar um funcionário por ID
  async findById(id: number): Promise<EmployeeType | null> {
    return prisma.employees.findUnique({
      where: { id },
    });
  }

  // Criar um novo funcionário
  async create(data: Omit<EmployeeType, 'id' | 'createdAt' | 'updatedAt'> & { role: string }): Promise<EmployeeType> {
    return prisma.employees.create({
      data: {
        ...data,
        email: data.email ?? '', // Ensure email is provided with a default value
        role: data.role as Role, // Cast 'role' to the Prisma enum
      },
    });
  }

  // Atualizar um funcionário
  async update(
    id: number,
    data: Partial<Omit<EmployeeType, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<EmployeeType | null> {
    return prisma.employees.update({
      where: { id },
      data,
    });
  }

  // Excluir um funcionário
  async delete(id: number): Promise<void> {
    await prisma.employees.delete({
      where: { id },
    });
  }
}

export default new EmployeesRepository();