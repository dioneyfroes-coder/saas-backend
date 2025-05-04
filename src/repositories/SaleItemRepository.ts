import { PrismaClient } from '@prisma/client';
import { SaleItemType } from '../types/SaleItemType';

const prisma = new PrismaClient();

class SaleItemRepository {
  // Buscar todos os itens de uma venda por saleId
  async findAllBySale(saleId: number): Promise<SaleItemType[]> {
    return await prisma.sale_items.findMany({
      where: { saleId, sale: { employees: {  } } },
      include: {
        stock: true, // Inclui os dados do item no estoque
      },
    });
  }

  // Criar um novo item de venda
  async create(data: Omit<SaleItemType, 'id'>): Promise<SaleItemType> {
    return await prisma.sale_items.create({
      data,
    });
  }

  // Excluir todos os itens de uma venda por saleId
  async deleteBySale(saleId: number): Promise<boolean> {
    await prisma.sale_items.deleteMany({
      where: { saleId, sale: { employees: {  } } },
    });
    return true;
  }
}

export default new SaleItemRepository();