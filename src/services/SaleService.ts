import SaleRepository from '../repositories/SaleRepository';
import { SaleType } from '../types/SaleType';

const SaleService = {
  // Criar uma nova venda
  async createSale({
    employeesId,
    items,
  }: {
    employeesId: number;
    items: Array<{ stockId: number; quantity: number; price: number }>;
  }): Promise<SaleType> {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const saleData = {
      employeesId,
      total,
      status: 'pago' as 'pago',
    };

    return await SaleRepository.create(saleData, items);
  },

  // Buscar todas as vendas de um funcionário
  async getAllSales(employeesId: number): Promise<SaleType[]> {
    return await SaleRepository.findAllByEmployee(employeesId);
  },

  // Buscar uma venda por ID
  async getSaleById(id: number, employeesId: number): Promise<SaleType | null> {
    return await SaleRepository.findById(id, employeesId);
  },

  // Cancelar uma venda
  async cancelSale(id: number, employeesId: number): Promise<SaleType | null> {
    return await SaleRepository.cancel(id, employeesId);
  },
};

export default SaleService;