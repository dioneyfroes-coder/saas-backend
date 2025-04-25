import SaleRepository from '../repositories/SaleRepository.js';
import FinanceRecord from '../models/Finance_Record.js';

const SaleService = {
  async createSale({ tenantId, userId, items }) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const saleData = {
      tenantId,
      userId,
      total,
      status: 'pago',
    };

    const sale = await SaleRepository.create(saleData, items);

    // Cria um registro financeiro associado à venda
    await FinanceRecord.create({
      description: 'Venda realizada',
      type: 'entrada',
      value: total,
      date: new Date(),
      tenantId,
      saleId: sale.id,
      category: 'Vendas',
    });

    return sale;
  },

  async getAllSales(tenantId) {
    return await SaleRepository.findAllByTenant(tenantId);
  },

  async getSaleById(id, tenantId) {
    return await SaleRepository.findById(id, tenantId);
  },

  async cancelSale(id, tenantId) {
    return await SaleRepository.cancel(id, tenantId);
  },
};

export default SaleService;