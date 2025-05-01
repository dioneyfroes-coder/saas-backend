import { PrismaClient } from '@prisma/client';
import { StockType } from '../types/StockType';

const prisma = new PrismaClient();

class StockRepository {
  // Buscar todos os itens no estoque
  async findAll(): Promise<StockType[]> {
    return await prisma.stock.findMany({
      orderBy: { name: 'asc' },
    });
  }

  // Buscar um item por ID
  async findById(id: number): Promise<StockType | null> {
    return await prisma.stock.findUnique({
      where: { id },
    });
  }

  // Buscar um item por código de barras
  async findByBarcode(barcode: string): Promise<StockType | null> {
    return await prisma.stock.findUnique({
      where: { barcode },
    });
  }

  // Criar um novo item no estoque
  async create(data: Omit<StockType, 'id' | 'createdAt' | 'updatedAt'>): Promise<StockType> {
    return await prisma.stock.create({
      data,
    });
  }

  // Atualizar um item no estoque
  async update(id: number, data: Partial<Omit<StockType, 'id' | 'createdAt' | 'updatedAt'>>): Promise<StockType | null> {
    return await prisma.stock.update({
      where: { id },
      data,
    });
  }

  // Excluir um item do estoque
  async delete(id: number): Promise<void> {
    await prisma.stock.delete({
      where: { id },
    });
  }
}

export default new StockRepository();