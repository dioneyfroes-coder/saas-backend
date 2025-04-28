import { PrismaClient } from "@prisma/client";
import { SaleItemType } from "../types/SaleItemType";

const prisma = new PrismaClient();

class SaleItemRepository {
  // Buscar todos os itens de uma venda por saleId e tenantId
  async findAllBySale(saleId: number, tenantId: number): Promise<SaleItemType[]> {
    return await prisma.sale_items.findMany({
      where: { saleId, tenantId },
      include: {
        product: true, // Inclui os dados do produto relacionado
      },
    });
  }

  // Criar um novo item de venda
  async create(data: Omit<SaleItemType, "id">): Promise<SaleItemType> {
    return await prisma.sale_items.create({
      data,
    });
  }

  // Excluir todos os itens de uma venda por saleId e tenantId
  async deleteBySale(saleId: number, tenantId: number): Promise<boolean> {
    await prisma.sale_items.deleteMany({
      where: { saleId, tenantId },
    });
    return true;
  }
}

export default new SaleItemRepository();