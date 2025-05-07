import { PrismaClient } from '@prisma/client';
import { SaleItemType } from '../types/SaleItemType';

const prisma = new PrismaClient();

class SaleItemRepository {
  // Buscar todos os itens de uma venda por saleId
  async findAllBySale(saleId: number): Promise<SaleItemType[]> {
    const saleItems = await prisma.sale_items.findMany({
      where: { saleId, sale: { employees: {  } } },
      include: {
        stock: true, // Inclui os dados do item no estoque
      },
    });

    return saleItems.map(item => ({
      ...item,
      price: item.price.toNumber(), // Convert Decimal to number
      stock: {
        ...item.stock,
        price: item.stock.price.toNumber(), // Convert Decimal to number in stock
      },
    }));
  }

  // Criar um novo item de venda
  async create(data: Omit<SaleItemType, 'id'>): Promise<SaleItemType> {
    const createdItem = await prisma.sale_items.create({
      data,
    });

    return {
      ...createdItem,
      price: createdItem.price.toNumber(), // Convert Decimal to number
    };
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