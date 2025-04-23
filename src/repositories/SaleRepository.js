import Sale from '../models/Sale.js';
import SaleItem from '../models/SaleItem.js';
import Product from '../models/Product.js';
import sequelize from '../config/database.js';

const SaleRepository = {
  async create(saleData, items) {
    return await sequelize.transaction(async (t) => {
      const sale = await Sale.create(saleData, { transaction: t });

      const saleItems = items.map(item => ({
        ...item,
        saleId: sale.id,
      }));

      await SaleItem.bulkCreate(saleItems, { transaction: t });

      return sale;
    });
  },

  async findAllByTenant(tenantId) {
    return await Sale.findAll({
      where: { tenantId },
      include: [{ model: SaleItem, include: [Product] }],
      order: [['createdAt', 'DESC']],
    });
  },

  async findById(id, tenantId) {
    return await Sale.findOne({
      where: { id, tenantId },
      include: [{ model: SaleItem, include: [Product] }],
    });
  },

  async cancel(id, tenantId) {
    const sale = await Sale.findOne({ where: { id, tenantId } });
    if (!sale) return null;

    sale.status = 'cancelado';
    await sale.save();
    return sale;
  },
};

export default SaleRepository;
