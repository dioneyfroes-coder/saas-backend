import { PrismaClient } from "@prisma/client";
import { InventoryMovementType } from "../types/InventoryMovementType";

const prisma = new PrismaClient();

class InventoryMovementRepository {
  // Buscar todos os movimentos de inventário por inventoryId e tenantId
  async findAllByInventory(inventoryId: number, tenantId: number): Promise<InventoryMovementType[]> {
    return await prisma.inventory_movements.findMany({
      where: { inventoryId, tenantId },
      orderBy: { createdAt: "desc" },
    });
  }

  // Criar um novo movimento de inventário
  async create(data: Omit<InventoryMovementType, "id" | "createdAt" | "updatedAt">): Promise<InventoryMovementType> {
    return await prisma.inventory_movements.create({
      data,
    });
  }

  // Buscar um movimento de inventário por ID
  async findById(id: number, tenantId: number): Promise<InventoryMovementType | null> {
    return await prisma.inventory_movements.findFirst({
      where: { id, tenantId },
    });
  }

  // Atualizar um movimento de inventário
  async update(
    id: number,
    tenantId: number,
    data: Partial<Omit<InventoryMovementType, "id" | "createdAt" | "updatedAt">>
  ): Promise<InventoryMovementType | null> {
    const movement = await this.findById(id, tenantId);
    if (!movement) throw new Error("Movimento de inventário não encontrado");

    return await prisma.inventory_movements.update({
      where: { id },
      data,
    });
  }

  // Excluir um movimento de inventário
  async delete(id: number, tenantId: number): Promise<boolean> {
    const movement = await this.findById(id, tenantId);
    if (!movement) throw new Error("Movimento de inventário não encontrado");

    await prisma.inventory_movements.delete({
      where: { id },
    });
    return true;
  }
}

export default new InventoryMovementRepository();