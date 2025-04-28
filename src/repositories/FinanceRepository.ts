import { PrismaClient } from "@prisma/client";
import { FinanceRecordType } from "../types/FinanceRecordType";

const prisma = new PrismaClient();

class FinanceRepository {
  async create(data: Omit<FinanceRecordType, "id" | "createdAt" | "updatedAt">): Promise<FinanceRecordType> {
    return await prisma.finance_records.create({
      data,
    });
  }

  async findAllByTenant(tenantId: number): Promise<FinanceRecordType[]> {
    return await prisma.finance_records.findMany({
      where: { tenantId },
      orderBy: { date: "desc" },
    });
  }

  async findById(id: number, tenantId: number): Promise<FinanceRecordType | null> {
    return await prisma.finance_records.findFirst({
      where: { id, tenantId },
    });
  }

  async update(
    id: number,
    tenantId: number,
    data: Partial<Omit<FinanceRecordType, "id" | "createdAt" | "updatedAt">>
  ): Promise<FinanceRecordType | null> {
    const record = await this.findById(id, tenantId);
    if (!record) throw new Error("Registro financeiro não encontrado");

    return await prisma.finance_records.update({
      where: { id },
      data,
    });
  }

  async delete(id: number, tenantId: number): Promise<boolean> {
    const record = await this.findById(id, tenantId);
    if (!record) throw new Error("Registro financeiro não encontrado");

    await prisma.finance_records.delete({
      where: { id },
    });
    return true;
  }

  async findByPeriod(tenantId: number, startDate: Date, endDate: Date): Promise<FinanceRecordType[]> {
    return await prisma.finance_records.findMany({
      where: {
        tenantId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: "asc" },
    });
  }

  async getSummaryByCategory(tenantId: number): Promise<{ category: string; total: number }[]> {
    const result = await prisma.finance_records.groupBy({
      by: ["category"],
      where: { tenantId },
      _sum: {
        value: true,
      },
      orderBy: {
        category: "asc",
      },
    });

    return result.map((item: { category: any; _sum: { value: any; }; }) => ({
      category: item.category,
      total: item._sum.value || 0,
    }));
  }

  async getTotalBalance(tenantId: number): Promise<number> {
    const result = await prisma.finance_records.aggregate({
      where: { tenantId },
      _sum: {
        value: true,
      },
    });

    const entradas = await prisma.finance_records.aggregate({
      where: { tenantId, type: "entrada" },
      _sum: {
        value: true,
      },
    });

    const saidas = await prisma.finance_records.aggregate({
      where: { tenantId, type: "saida" },
      _sum: {
        value: true,
      },
    });

    const totalEntradas = entradas._sum.value || 0;
    const totalSaidas = saidas._sum.value || 0;

    return totalEntradas - totalSaidas;
  }
};

export default new FinanceRepository();