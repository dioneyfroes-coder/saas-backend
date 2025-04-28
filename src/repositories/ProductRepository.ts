import { PrismaClient } from "@prisma/client";
import { ProductType } from "../types/ProductType";

const prisma = new PrismaClient();

class ProductRepository {
  // Buscar todos os produtos de um tenant
  async findAll(tenantId: number): Promise<ProductType[]> {
    return await prisma.products.findMany({
      where: { tenantId },
    });
  }

  // Buscar um produto por ID e tenant
  async findById(id: number, tenantId: number): Promise<ProductType | null> {
    return await prisma.products.findFirst({
      where: { id, tenantId },
    });
  }

  // Buscar um produto por código de barras e tenant
  async findByCodigoBarras(codigoBarras: string, tenantId: number): Promise<ProductType | null> {
    return await prisma.products.findFirst({
      where: { codigobarras: codigoBarras, tenantId },
    });
  }

  // Criar um novo produto
  async create(data: Omit<ProductType, "id">): Promise<ProductType> {
    return await prisma.products.create({
      data,
    });
  }

  // Atualizar um produto
  async update(
    id: number,
    tenantId: number,
    data: Partial<Omit<ProductType, "id" | "tenantId">>
  ): Promise<ProductType | null> {
    const product = await this.findById(id, tenantId);
    if (!product) throw new Error("Produto não encontrado");

    return await prisma.products.update({
      where: { id },
      data,
    });
  }

  // Excluir um produto por ID e tenant
  async delete(id: number, tenantId: number): Promise<boolean> {
    const product = await this.findById(id, tenantId);
    if (!product) throw new Error("Produto não encontrado");

    await prisma.products.delete({
      where: { id },
    });
    return true;
  }

  // Excluir um produto por código de barras e tenant
  async deleteByCodigoBarras(codigoBarras: string, tenantId: number): Promise<boolean> {
    const product = await this.findByCodigoBarras(codigoBarras, tenantId);
    if (!product) throw new Error("Produto não encontrado");

    await prisma.products.delete({
      where: { id: product.id },
    });
    return true;
  }
}

export default new ProductRepository();