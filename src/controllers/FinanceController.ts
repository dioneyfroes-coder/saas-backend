//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\controllers\FinanceController.ts
import { Request, Response } from 'express';
import FinanceService from '../services/FinanceService';
import {
  NotFoundError,
  InternalServerError,
} from '../errors/AppError';

class FinanceController {
  // Criar um novo registro financeiro
  async create(req: Request, res: Response): Promise<void> {
    try {
      const record = await FinanceService.createFinanceRecord(req.body);
      res.status(201).json(record);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao criar registro financeiro.'
      );
    }
  }

  // Buscar todos os registros financeiros
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const records = await FinanceService.getFinanceRecords();
      res.json(records);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao buscar registros financeiros.'
      );
    }
  }

  // Buscar um registro financeiro por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const record = await FinanceService.getFinanceRecordById(Number(req.params.id));
      if (!record) {
        throw new NotFoundError('Registro não encontrado.');
      }
      res.json(record);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao buscar registro financeiro.'
      );
    }
  }

  // Atualizar um registro financeiro
  async update(req: Request, res: Response): Promise<void> {
    try {
      const record = await FinanceService.updateFinanceRecord(Number(req.params.id), req.body);
      if (!record) {
        throw new NotFoundError('Registro não encontrado.');
      }
      res.json(record);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao atualizar registro financeiro.'
      );
    }
  }

  // Excluir um registro financeiro
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const success = await FinanceService.deleteFinanceRecord(Number(req.params.id));
      if (!success) {
        throw new NotFoundError('Registro não encontrado.');
      }
      res.status(204).send();
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao excluir registro financeiro.'
      );
    }
  }

  // Buscar registros financeiros por período
  async getByPeriod(req: Request, res: Response): Promise<void> {
    try {
      const { startDate, endDate } = req.query;
      const records = await FinanceService.getFinanceRecordsByPeriod(
        startDate as string,
        endDate as string
      );
      res.json(records);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao buscar registros por período.'
      );
    }
  }

  // Obter resumo financeiro por categoria
  async getSummaryByCategory(req: Request, res: Response): Promise<void> {
    try {
      const summary = await FinanceService.getSummaryByCategory();
      res.json(summary);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao buscar resumo por categoria.'
      );
    }
  }

  // Obter saldo total
  async getTotalBalance(req: Request, res: Response): Promise<void> {
    try {
      const balance = await FinanceService.getTotalBalance();
      res.json({ balance });
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao calcular saldo total.'
      );
    }
  }
}

export default new FinanceController();