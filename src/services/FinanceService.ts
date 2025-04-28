import FinanceRepository from '../repositories/FinanceRepository.js';
import { FinanceRecordType } from '../types/FinanceRecordType.js';

export default {
  // Criar um novo registro financeiro
  async createFinanceRecord(data: Omit<FinanceRecordType, 'id' | 'createdAt' | 'updatedAt'>, tenantId: number): Promise<FinanceRecordType> {
    return await FinanceRepository.create({ ...data, tenantId });
  },

  // Buscar todos os registros financeiros de um tenant
  async getFinanceRecords(tenantId: number): Promise<FinanceRecordType[]> {
    return await FinanceRepository.findAllByTenant(tenantId);
  },

  // Buscar um registro financeiro por ID
  async getFinanceRecordById(id: number, tenantId: number): Promise<FinanceRecordType> {
    const record = await FinanceRepository.findById(id, tenantId);
    if (!record) throw new Error('Registro financeiro não encontrado');
    return record;
  },

  // Atualizar um registro financeiro
  async updateFinanceRecord(
    id: number,
    data: Partial<Omit<FinanceRecordType, 'id' | 'createdAt' | 'updatedAt'>>,
    tenantId: number
  ): Promise<FinanceRecordType | null> {
    return await FinanceRepository.update(id, tenantId, data);
  },

  // Excluir um registro financeiro
  async deleteFinanceRecord(id: number, tenantId: number): Promise<boolean> {
    return await FinanceRepository.delete(id, tenantId);
  },

  // Buscar registros financeiros por período
  async getFinanceRecordsByPeriod(tenantId: number, startDate: string, endDate: string): Promise<FinanceRecordType[]> {
    return await FinanceRepository.findByPeriod(tenantId, new Date(startDate), new Date(endDate));
  },

  // Obter resumo financeiro por categoria
  async getSummaryByCategory(tenantId: number): Promise<{ category: string; total: number }[]> {
    return await FinanceRepository.getSummaryByCategory(tenantId);
  },

  // Obter saldo total
  async getTotalBalance(tenantId: number): Promise<number> {
    return await FinanceRepository.getTotalBalance(tenantId);
  },
};