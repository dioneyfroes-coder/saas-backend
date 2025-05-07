import { PrismaClient } from '@prisma/client';
import { StockType } from '../types/StockType';

const prisma = new PrismaClient();

class StockRepository {
  // Buscar todos os itens no estoque
  async findAll(): Promise<StockType[]> {
    const stocks = await prisma.stock.findMany({
      orderBy: { name: 'asc' },
    });
    return stocks.map(stock => ({
      ...stock,
      price: stock.price.toNumber(),
    }));
  }

  // Buscar um item por ID
  async findById(id: number): Promise<StockType | null> {
    const stock = await prisma.stock.findUnique({
      where: { id },
    });

    if (!stock) return null;

    return {
      ...stock,
      price: stock.price.toNumber(),
    };
  }

  // Buscar um item por código de barras
  async findByBarcode(barcode: string): Promise<StockType | null> {
    const stock = await prisma.stock.findUnique({
      where: { barcode },
    });

    if (!stock) return null;

    return {
      ...stock,
      price: stock.price.toNumber(),
    };
  }

  // Criar um novo item no estoque
  async create(data: Omit<StockType, 'id' | 'createdAt' | 'updatedAt'>): Promise<StockType> {
    const createdStock = await prisma.stock.create({
      data,
    });

    return {
      ...createdStock,
      price: createdStock.price.toNumber(),
    };
  }

  // Atualizar um item no estoque
  async update(id: number, data: Partial<Omit<StockType, 'id' | 'createdAt' | 'updatedAt'>>): Promise<StockType | null> {
    const updatedStock = await prisma.stock.update({
      where: { id },
      data,
    });

    return {
      ...updatedStock,
      price: updatedStock.price.toNumber(),
    };
  }

  // Excluir um item do estoque
  async delete(id: number): Promise<void> {
    await prisma.stock.delete({
      where: { id },
    });
  }
}

export default new StockRepository();