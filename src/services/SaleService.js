import SaleRepository from '../repositories/SaleRepository.js';

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
