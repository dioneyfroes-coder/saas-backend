import FinanceRecord from '../models/Finance_Record.js';
import { Op, Sequelize } from 'sequelize';

class FinanceRepository {
  async create(data) {
    return await FinanceRecord.create(data);
  }

  async findAllByTenant(tenantId) {
    return await FinanceRecord.findAll({
      where: { tenantId },
      order: [['date', 'DESC']],
    });
  }

  async findById(id, tenantId) {
    return await FinanceRecord.findOne({
      where: { id, tenantId },
    });
  }

  async update(id, tenantId, data) {
    const record = await this.findById(id, tenantId);
    if (!record) throw new Error('Registro financeiro não encontrado');
    return await record.update(data);
  }

  async delete(id, tenantId) {
    const record = await this.findById(id, tenantId);
    if (!record) throw new Error('Registro financeiro não encontrado');
    await record.destroy();
    return true;
  }

  async findByPeriod(tenantId, startDate, endDate) {
    return await FinanceRecord.findAll({
      where: {
        tenantId,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [['date', 'ASC']],
    });
  }

  async getSummaryByCategory(tenantId) {
    return await FinanceRecord.findAll({
      where: { tenantId },
      attributes: [
        'category',
        [Sequelize.fn('SUM', Sequelize.col('value')), 'total'],
      ],
      group: ['category'],
      order: [['category', 'ASC']],
    });
  }

  async getTotalBalance(tenantId) {
    const result = await FinanceRecord.findAll({
      where: { tenantId },
      attributes: [
        [Sequelize.literal(`
          SUM(CASE WHEN type = 'entrada' THEN value ELSE 0 END) -
          SUM(CASE WHEN type = 'saida' THEN value ELSE 0 END)
        `), 'balance'],
      ],
    });

    return result[0]?.dataValues?.balance || 0;
  }
}

export default new FinanceRepository();