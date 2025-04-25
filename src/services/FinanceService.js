import FinanceRepository from '../repositories/FinanceRepository.js';

export default {
  async createFinanceRecord(data, tenantId) {
    return await FinanceRepository.create({ ...data, tenantId });
  },

  async getFinanceRecords(tenantId) {
    return await FinanceRepository.findAllByTenant(tenantId);
  },

  async getFinanceRecordById(id, tenantId) {
    const record = await FinanceRepository.findById(id, tenantId);
    if (!record) throw new Error('Registro financeiro não encontrado');
    return record;
  },

  async updateFinanceRecord(id, data, tenantId) {
    return await FinanceRepository.update(id, tenantId, data);
  },

  async deleteFinanceRecord(id, tenantId) {
    return await FinanceRepository.delete(id, tenantId);
  },

  async getFinanceRecordsByPeriod(tenantId, startDate, endDate) {
    return await FinanceRepository.findByPeriod(tenantId, startDate, endDate);
  },

  async getSummaryByCategory(tenantId) {
    return await FinanceRepository.getSummaryByCategory(tenantId);
  },

  async getTotalBalance(tenantId) {
    return await FinanceRepository.getTotalBalance(tenantId);
  }
};