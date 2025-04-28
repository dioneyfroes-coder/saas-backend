import { Request, Response } from 'express';
import SaleService from '../services/SaleService.js';

class SaleController {
  // Criar uma nova venda
  async createSale(req: Request, res: Response): Promise<void> {
    try {
      const { items, userId } = req.body;
      const tenantId = req.tenantId;

      const sale = await SaleService.createSale({ tenantId: tenantId!, userId, items });
      res.status(201).json(sale);
    } catch (error) {
      console.error('Erro ao criar venda:', error);
      res.status(500).json({ message: 'Erro ao criar venda' });
    }
  }

  // Buscar todas as vendas
  async getAllSales(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId;
      const sales = await SaleService.getAllSales(tenantId!);
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar vendas' });
    }
  }

  // Buscar uma venda por ID
  async getSaleById(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId;
      const id = Number(req.params.id);

      const sale = await SaleService.getSaleById(id, tenantId!);
      if (sale) {
        res.json(sale);
      } else {
        res.status(404).json({ message: 'Venda não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar venda' });
    }
  }

  // Cancelar uma venda
  async cancelSale(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = req.tenantId;
      const id = Number(req.params.id);

      const sale = await SaleService.cancelSale(id, tenantId!);
      if (sale) {
        res.json({ message: 'Venda cancelada com sucesso', sale });
      } else {
        res.status(404).json({ message: 'Venda não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cancelar venda' });
    }
  }
}

export default new SaleController();