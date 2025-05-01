//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\repositories\FinanceRepository.ts
import { PrismaClient } from '@prisma/client';
import { FinanceType } from '../types/FinanceRecordType';

const prisma = new PrismaClient();

class FinanceRepository {
  // Criar um registro financeiro
  async create(data: Omit<FinanceType, 'id' | 'createdAt' | 'updatedAt'>): Promise<FinanceType> {
    return await prisma.finance.create({
      data,
    });
  }

  // Buscar todos os registros financeiros
  async findAll(): Promise<FinanceType[]> {
    return await prisma.finance.findMany({
      orderBy: { date: 'desc' },
    });
  }

  // Buscar um registro financeiro por ID
  async findById(id: number): Promise<FinanceType | null> {
    return await prisma.finance.findUnique({
      where: { id },
    });
  }

  // Atualizar um registro financeiro
  async update(
    id: number,
    data: Partial<Omit<FinanceType, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<FinanceType | null> {
    // Verifica se o registro existe
    const record = await this.findById(id);
    if (!record) throw new Error('Registro financeiro não encontrado');

    return prisma.finance.update({
      where: { id },
      data,
    });
  }

  // Excluir um registro financeiro
  async delete(id: number): Promise<boolean> {
    const record = await this.findById(id);
    if (!record) throw new Error('Registro financeiro não encontrado');

    await prisma.finance.delete({
      where: { id },
    });
    return true;
  }

  // Buscar registros financeiros por período
  async findByPeriod(startDate: Date, endDate: Date): Promise<FinanceType[]> {
    return prisma.finance.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  // Agrupar registros por categoria
  async getSummaryByCategory(): Promise<{ category: string; total: number }[]> {
    const result = await prisma.finance.groupBy({
      by: ['category'],
      _sum: {
        value: true,
      },
      orderBy: {
        category: 'asc',
      },
    });

    return result.map((item: { category: any; _sum: { value: any; }; }) => ({
      category: item.category,
      total: item._sum.value || 0,
    }));
  }

  // Obter saldo total, somando income e subtraindo expense
  async getTotalBalance(): Promise<number> {
    const incomes = await prisma.finance.aggregate({
      where: { type: 'income' },
      _sum: { value: true },
    });
    const expenses = await prisma.finance.aggregate({
      where: { type: 'expense' },
      _sum: { value: true },
    });

    const totalIncome = incomes._sum.value || 0;
    const totalExpense = expenses._sum.value || 0;
    return totalIncome - totalExpense;
  }
}

export default new FinanceRepository();