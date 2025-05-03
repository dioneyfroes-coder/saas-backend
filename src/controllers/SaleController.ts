//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\controllers\SaleController.ts
import { Request, Response } from 'express';
import SaleService from '../services/SaleService';
import {
  NotFoundError,
  InternalServerError,
} from '../errors/AppError';

class SaleController {
  // Criar uma nova venda
  async createSale(req: Request, res: Response): Promise<void> {
    try {
      const { items } = req.body;
      const employeesId = (req as any).employeesId; // caso venha de middleware

      const sale = await SaleService.createSale({ employeesId, items });
      res.status(201).json(sale);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao criar venda'
      );
    }
  }

  // Buscar todas as vendas
  async getAllSales(req: Request, res: Response): Promise<void> {
    try {
      const employeesId = (req as any).employeesId;
      const sales = await SaleService.getAllSales(employeesId);
      res.json(sales);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao listar vendas'
      );
    }
  }

  // Buscar uma venda por ID
  async getSaleById(req: Request, res: Response): Promise<void> {
    try {
      const employeesId = (req as any).employeesId;
      const id = Number(req.params.id);

      const sale = await SaleService.getSaleById(id, employeesId);
      if (!sale) {
        throw new NotFoundError('Venda não encontrada');
      }
      res.json(sale);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao buscar venda'
      );
    }
  }

  // Cancelar uma venda
  async cancelSale(req: Request, res: Response): Promise<void> {
    try {
      const employeesId = (req as any).employeesId;
      const id = Number(req.params.id);

      const sale = await SaleService.cancelSale(id, employeesId);
      if (!sale) {
        throw new NotFoundError('Venda não encontrada');
      }
      res.json({ message: 'Venda cancelada com sucesso', sale });
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao cancelar venda'
      );
    }
  }
}

export default new SaleController();