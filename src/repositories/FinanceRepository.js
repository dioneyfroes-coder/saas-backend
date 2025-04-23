import FinanceRecord from '../models/FinanceRecord.js';
import { Op, Sequelize } from 'sequelize';

class FinanceRepository {
  // Cria um registro financeiro
  async create(data) {
    return await FinanceRecord.create(data);
  }

  // Busca todos os registros financeiros de um tenant
  async findAllByTenant(tenantId) {
    return await FinanceRecord.findAll({
      where: { tenantId },
      order: [['date', 'DESC']],
    });
  }

  // Busca um registro financeiro por ID e tenantId
  async findById(id, tenantId) {
    return await FinanceRecord.findOne({
      where: { id, tenantId },
    });
  }

  // Atualiza um registro financeiro por ID e tenantId
  async update(id, tenantId, data) {
    const record = await this.findById(id, tenantId);
    if (record) {
      return await record.update(data);
    }
    return null;
  }

  // Exclui um registro financeiro por ID e tenantId
  async delete(id, tenantId) {
    const record = await this.findById(id, tenantId);
    if (record) {
      await record.destroy();
      return true;
    }
    return false;
  }

  // Busca registros financeiros por período (data inicial e final)
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

  // Resumo por categoria (agrupamento e soma dos valores)
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

  // Calcula o saldo total (entradas - saídas)
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