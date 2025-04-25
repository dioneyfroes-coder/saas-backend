import SaleItem from '../models/Sale_Item.js';

class SaleItemRepository {
  async findAllBySale(saleId, tenantId) {
    return await SaleItem.findAll({
      where: { saleId, tenantId },
      include: ['produto'],
    });
  }

  async create(data) {
    return await SaleItem.create(data);
  }

  async deleteBySale(saleId, tenantId) {
    return await SaleItem.destroy({
      where: { saleId, tenantId },
    });
  }
}

export default new SaleItemRepository();