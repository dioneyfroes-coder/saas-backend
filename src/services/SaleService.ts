import SaleRepository from '../repositories/SaleRepository.js';
import { SaleType } from '../types/SaleType.js';

const SaleService = {
  // Criar uma nova venda
  async createSale({
    tenantId,
    userId,
    items,
  }: {
    tenantId: number;
    userId?: number;
    items: Array<{ productId: number; quantity: number; price: number }>;
  }): Promise<SaleType> {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const saleData = {
      tenantId,
      userId,
      total,
      status: 'pago' as 'pago',
    };

    return await SaleRepository.create(saleData, items);
  },

  // Buscar todas as vendas de um tenant
  async getAllSales(tenantId: number): Promise<SaleType[]> {
    return await SaleRepository.findAllByTenant(tenantId);
  },

  // Buscar uma venda por ID
  async getSaleById(id: number, tenantId: number): Promise<SaleType | null> {
    return await SaleRepository.findById(id, tenantId);
  },

  // Cancelar uma venda
  async cancelSale(id: number, tenantId: number): Promise<SaleType | null> {
    return await SaleRepository.cancel(id, tenantId);
  },
};

export default SaleService;