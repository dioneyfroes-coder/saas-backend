import { PrismaClient } from "@prisma/client";
import { SaleType } from "../types/SaleType";

const prisma = new PrismaClient();

class SaleRepository {
  // Criar uma nova venda com itens
  async create(saleData: Omit<SaleType, "id" | "createdAt" | "updatedAt">, items: Array<{ productId: number; quantity: number; price: number }>): Promise<SaleType> {
    return await prisma.$transaction(async (transaction: { sales: { create: (arg0: { data: Omit<SaleType, "id" | "createdAt" | "updatedAt">; }) => any; }; sale_items: { createMany: (arg0: { data: { saleId: any; tenantId: any; productId: number; quantity: number; price: number; }[]; }) => any; }; }) => {
      // Criar a venda
      const sale = await transaction.sales.create({
        data: saleData,
      });

      // Criar os itens da venda
      const saleItems = items.map((item) => ({
        ...item,
        saleId: sale.id,
        tenantId: sale.tenantId,
      }));

      await transaction.sale_items.createMany({
        data: saleItems,
      });

      return sale;
    });
  }

  // Buscar todas as vendas de um tenant
  async findAllByTenant(tenantId: number): Promise<SaleType[]> {
    return await prisma.sales.findMany({
      where: { tenantId },
      include: {
        saleItems: {
          include: {
            product: true, // Inclui os dados do produto relacionado
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  // Buscar uma venda por ID e tenant
  async findById(id: number, tenantId: number): Promise<SaleType | null> {
    return await prisma.sales.findFirst({
      where: { id, tenantId },
      include: {
        saleItems: {
          include: {
            product: true, // Inclui os dados do produto relacionado
          },
        },
      },
    });
  }

  // Cancelar uma venda
  async cancel(id: number, tenantId: number): Promise<SaleType | null> {
    const sale = await prisma.sales.findFirst({
      where: { id, tenantId },
    });

    if (!sale) return null;

    return await prisma.sales.update({
      where: { id },
      data: { status: "cancelado" },
    });
  }
}

export default new SaleRepository();