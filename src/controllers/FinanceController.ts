import { Request, Response } from 'express';
import FinanceService from '../services/FinanceService';

class FinanceController {
  // Criar um novo registro financeiro
  async create(req: Request, res: Response): Promise<void> {
    try {
      const record = await FinanceService.createFinanceRecord(req.body, req.tenantId!);
      res.status(201).json(record);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar registro financeiro', error: (error as Error).message });
    }
  }

  // Buscar todos os registros financeiros
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const records = await FinanceService.getFinanceRecords(req.tenantId!);
      res.json(records);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar registros financeiros', error: (error as Error).message });
    }
  }

  // Buscar um registro financeiro por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const record = await FinanceService.getFinanceRecordById(Number(req.params.id), req.tenantId!);
      if (!record) {
        res.status(404).json({ message: 'Registro não encontrado' });
        return;
      }
      res.json(record);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar registro financeiro', error: (error as Error).message });
    }
  }

  // Atualizar um registro financeiro
  async update(req: Request, res: Response): Promise<void> {
    try {
      const record = await FinanceService.updateFinanceRecord(Number(req.params.id), req.body, req.tenantId!);
      if (!record) {
        res.status(404).json({ message: 'Registro não encontrado' });
        return;
      }
      res.json(record);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar registro financeiro', error: (error as Error).message });
    }
  }

  // Excluir um registro financeiro
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const success = await FinanceService.deleteFinanceRecord(Number(req.params.id), req.tenantId!);
      if (!success) {
        res.status(404).json({ message: 'Registro não encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir registro financeiro', error: (error as Error).message });
    }
  }

  // Buscar registros financeiros por período
  async getByPeriod(req: Request, res: Response): Promise<void> {
    const { startDate, endDate } = req.query;
    try {
      const records = await FinanceService.getFinanceRecordsByPeriod(req.tenantId!, startDate as string, endDate as string);
      res.json(records);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar registros financeiros por período', error: (error as Error).message });
    }
  }

  // Obter resumo financeiro por categoria
  async getSummaryByCategory(req: Request, res: Response): Promise<void> {
    try {
      const summary = await FinanceService.getSummaryByCategory(req.tenantId!);
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar resumo por categoria', error: (error as Error).message });
    }
  }

  // Obter saldo total
  async getTotalBalance(req: Request, res: Response): Promise<void> {
    try {
      const balance = await FinanceService.getTotalBalance(req.tenantId!);
      res.json({ balance });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao calcular saldo total', error: (error as Error).message });
    }
  }
}

export default new FinanceController();