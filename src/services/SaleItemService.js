import SaleItemRepository from '../repositories/SaleItemRepository.js';

const SaleItemService = {
  async getItemsBySale(saleId, tenantId) {
    return await SaleItemRepository.findAllBySale(saleId, tenantId);
  },

  async createSaleItem(data) {
    return await SaleItemRepository.create(data);
  },

  async deleteItemsBySale(saleId, tenantId) {
    return await SaleItemRepository.deleteBySale(saleId, tenantId);
  },
};

export default SaleItemService;