import { PrismaClient } from "@prisma/client";
import { UserType } from "../types/UserType";

const prisma = new PrismaClient();

class UserRepository {
  // Buscar todos os usuários de um tenant
  async findAll(tenantId: number): Promise<UserType[]> {
    return await prisma.users.findMany({
      where: { tenantId },
    });
  }

  // Buscar um usuário por ID e tenant
  async findById(id: number, tenantId: number): Promise<UserType | null> {
    return await prisma.users.findFirst({
      where: { id, tenantId },
    });
  }

  // Buscar um usuário por username e tenant
  async findByUsername(username: string, tenantId: number): Promise<UserType | null> {
    return await prisma.users.findFirst({
      where: { username, tenantId },
    });
  }

  // Criar um novo usuário
  async create(data: Omit<UserType, "id" | "createdAt" | "updatedAt">): Promise<UserType> {
    return await prisma.users.create({
      data,
    });
  }

  // Atualizar um usuário
  async update(
    id: number,
    tenantId: number,
    data: Partial<Omit<UserType, "id" | "createdAt" | "updatedAt">>
  ): Promise<UserType | null> {
    const user = await this.findById(id, tenantId);
    if (!user) throw new Error("Usuário não encontrado");

    return await prisma.users.update({
      where: { id },
      data,
    });
  }

  // Excluir um usuário
  async delete(id: number, tenantId: number): Promise<boolean> {
    const user = await this.findById(id, tenantId);
    if (!user) throw new Error("Usuário não encontrado");

    await prisma.users.delete({
      where: { id },
    });
    return true;
  }
}

export default new UserRepository();