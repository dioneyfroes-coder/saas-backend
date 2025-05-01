//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\services\FinanceService.ts
import FinanceRepository from '../repositories/FinanceRepository';
import { FinanceType } from '../types/FinanceRecordType';

export default {
  // Criar um registro financeiro
  async createFinanceRecord(
    data: Omit<FinanceType, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<FinanceType> {
    return FinanceRepository.create(data);
  },

  // Buscar todos os registros financeiros
  async getFinanceRecords(): Promise<FinanceType[]> {
    return FinanceRepository.findAll();
  },

  // Buscar um registro financeiro por ID
  async getFinanceRecordById(id: number): Promise<FinanceType> {
    const record = await FinanceRepository.findById(id);
    if (!record) throw new Error('Registro financeiro não encontrado');
    return record;
  },

  // Atualizar um registro financeiro
  async updateFinanceRecord(
    id: number,
    data: Partial<Omit<FinanceType, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<FinanceType | null> {
    return FinanceRepository.update(id, data);
  },

  // Excluir um registro financeiro
  async deleteFinanceRecord(id: number): Promise<boolean> {
    return FinanceRepository.delete(id);
  },

  // Buscar registros financeiros por período
  async getFinanceRecordsByPeriod(startDate: string, endDate: string): Promise<FinanceType[]> {
    return FinanceRepository.findByPeriod(new Date(startDate), new Date(endDate));
  },

  // Obter resumo financeiro por categoria
  async getSummaryByCategory(): Promise<{ category: string; total: number }[]> {
    return FinanceRepository.getSummaryByCategory();
  },

  // Obter saldo total
  async getTotalBalance(): Promise<number> {
    return FinanceRepository.getTotalBalance();
  },

  async getTotalBalanceByCategory(): Promise<{ category: string; total: number }[]> {
    return FinanceRepository.getSummaryByCategory();
  },
};