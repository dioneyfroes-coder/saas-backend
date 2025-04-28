import { Request, Response } from 'express';
import SaleItemService from '../services/SaleItemService';

class SaleItemController {
  // Buscar todos os itens de uma venda
  async getItemsBySale(req: Request, res: Response): Promise<void> {
    const { saleId } = req.params;
    const { tenantId } = req;

    try {
      const items = await SaleItemService.getItemsBySale(Number(saleId), tenantId!);
      res.json(items);
    } catch (error) {
      console.error('Erro ao buscar itens da venda:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  // Criar um novo item de venda
  async createSaleItem(req: Request, res: Response): Promise<void> {
    const { tenantId } = req;
    const data = { ...req.body, tenantId };

    try {
      const item = await SaleItemService.createSaleItem(data);
      res.status(201).json(item);
    } catch (error) {
      console.error('Erro ao criar item da venda:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  // Excluir todos os itens de uma venda
  async deleteItemsBySale(req: Request, res: Response): Promise<void> {
    const { saleId } = req.params;
    const { tenantId } = req;

    try {
      await SaleItemService.deleteItemsBySale(Number(saleId), tenantId!);
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir itens da venda:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

export default new SaleItemController();