//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\repositories\FinanceRepository.ts
import { PrismaClient } from '@prisma/client';
import { FinanceType } from '../types/FinanceRecordType';

const prisma = new PrismaClient();

class FinanceRepository {
  // Criar um registro financeiro
  async create(data: Omit<FinanceType, 'id' | 'createdAt' | 'updatedAt'>): Promise<FinanceType> {
    const createdRecord = await prisma.finance.create({
      data,
    });
    return {
      ...createdRecord,
      value: createdRecord.value.toNumber(),
    };
  }

  // Buscar todos os registros financeiros
  async findAll(): Promise<FinanceType[]> {
    const records = await prisma.finance.findMany({
      orderBy: { date: 'desc' },
    });

    return records.map(record => ({
      ...record,
      value: record.value.toNumber(),
    }));
  }

  // Buscar um registro financeiro por ID
  async findById(id: number): Promise<FinanceType | null> {
    const record = await prisma.finance.findUnique({
      where: { id },
    });

    if (!record) return null;

    return {
      ...record,
      value: record.value.toNumber(),
    };
  }

  // Atualizar um registro financeiro
  async update(
    id: number,
    data: Partial<Omit<FinanceType, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<FinanceType | null> {
    // Verifica se o registro existe
    const record = await this.findById(id);
    if (!record) throw new Error('Registro financeiro não encontrado');

    const updatedRecord = await prisma.finance.update({
      where: { id },
      data,
    });

    return {
      ...updatedRecord,
      value: updatedRecord.value.toNumber(),
    };
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
    const records = await prisma.finance.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'asc' },
    });

    return records.map(record => ({
      ...record,
      value: record.value.toNumber(),
    }));
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

    const totalIncome = Number(incomes._sum.value) || 0;
    const totalExpense = Number(expenses._sum.value) || 0;
    return totalIncome - totalExpense;
  }
}

export default new FinanceRepository();