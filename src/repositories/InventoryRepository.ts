import { PrismaClient } from "@prisma/client";
import { InventoryType } from "../types/InventoryType";

const prisma = new PrismaClient();

class InventoryRepository {
  // Buscar inventário por produto e tenant
  async findByProduct(productId: number, tenantId: number): Promise<InventoryType | null> {
    return await prisma.inventories.findFirst({
      where: { productId, tenantId },
    });
  }

  // Criar um novo inventário
  async create(data: Omit<InventoryType, "id" | "createdAt" | "updatedAt">): Promise<InventoryType> {
    return await prisma.inventories.create({
      data,
    });
  }

  // Atualizar a quantidade de um inventário
  async updateQuantity(id: number, tenantId: number, quantity: number): Promise<InventoryType | null> {
    const inventory = await prisma.inventories.findFirst({
      where: { id, tenantId },
    });

    if (!inventory) throw new Error("Inventário não encontrado");

    return await prisma.inventories.update({
      where: { id },
      data: { quantity },
    });
  }

  // Buscar movimentos de inventário
  async findMovements(inventoryId: number, tenantId: number): Promise<any[]> {
    return await prisma.inventory_movements.findMany({
      where: { inventoryId, tenantId },
      orderBy: { createdAt: "desc" },
    });
  }
}

export default new InventoryRepository();