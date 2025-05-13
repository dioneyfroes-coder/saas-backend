//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\repositories\AuthRepository.ts
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

class AuthRepository {
  // Buscar funcionários pela role
  async findEmployeesByRole(role: Role) {
    return prisma.employees.findMany({
      where: { role },
    });
  }

  // Buscar dispositivo pelo identificador
  async findDeviceByIdentificador(identificador: string) {
    return prisma.devices.findUnique({
      where: { identificador },
    });
  }
}

export default new AuthRepository();