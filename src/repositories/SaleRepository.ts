import { PrismaClient } from '@prisma/client';
import { SaleType } from '../types/SaleType';

const prisma = new PrismaClient();

class SaleRepository {
  // Criar uma nova venda com itens
  async create(
    saleData: Omit<SaleType, 'id' | 'createdAt' | 'updatedAt'>,
    items: Array<{ stockId: number; quantity: number; price: number }>
  ): Promise<SaleType> {
    return await prisma.$transaction(async (transaction: { sales: { create: (arg0: { data: Omit<SaleType, "id" | "createdAt" | "updatedAt">; }) => any; }; sale_items: { createMany: (arg0: { data: { saleId: any; stockId: number; quantity: number; price: number; }[]; }) => any; }; }) => {
      // Criar a venda
      const sale = await transaction.sales.create({
        data: saleData,
      });

      // Criar os itens da venda
      const saleItems = items.map((item) => ({
        ...item,
        saleId: sale.id,
      }));

      await transaction.sale_items.createMany({
        data: saleItems,
      });

      return sale;
    });
  }

  // Buscar todas as vendas de um funcionário
  async findAllByEmployee(employeesId: number): Promise<SaleType[]> {
    const sales = await prisma.sales.findMany({
      where: { employeesId },
      include: {
        saleItems: {
          include: {
            stock: true, // Inclui os dados do item no estoque
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return sales.map((sale) => ({
      ...sale,
      total: sale.total.toNumber(), // Convert Decimal to number
    }));
  }

  // Buscar uma venda por ID e funcionário
  async findById(id: number, employeesId: number): Promise<SaleType | null> {
    const sale = await prisma.sales.findFirst({
      where: { id, employeesId },
      include: {
        saleItems: {
          include: {
            stock: true, // Inclui os dados do item no estoque
          },
        },
      },
    });

    if (!sale) return null;

    return {
      ...sale,
      total: sale.total.toNumber(), // Convert Decimal to number
    };
  }

  // Cancelar uma venda
  async cancel(id: number, employeesId: number): Promise<SaleType | null> {
    const sale = await prisma.sales.findFirst({
      where: { id, employeesId },
    });

    if (!sale) return null;

    const updatedSale = await prisma.sales.update({
      where: { id },
      data: { status: 'cancelado' },
    });

    return {
      ...updatedSale,
      total: updatedSale.total.toNumber(), // Convert Decimal to number
    };
  }
}

export default new SaleRepository();