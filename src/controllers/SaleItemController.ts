//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\controllers\SaleItemController.ts
import { Request, Response } from 'express';
import SaleItemService from '../services/SaleItemService';
import { InternalServerError } from '../errors/AppError';

class SaleItemController {
  // Buscar todos os itens de uma venda
  async getItemsBySale(req: Request, res: Response): Promise<void> {
    try {
      const { saleId } = req.params;
      const items = await SaleItemService.getItemsBySale(Number(saleId));
      res.json(items);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao buscar itens da venda.'
      );
    }
  }

  // Criar um novo item de venda
  async createSaleItem(req: Request, res: Response): Promise<void> {
    try {
      const data = { ...req.body };
      const item = await SaleItemService.createSaleItem(data);
      res.status(201).json(item);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao criar item da venda.'
      );
    }
  }

  // Excluir todos os itens de uma venda
  async deleteItemsBySale(req: Request, res: Response): Promise<void> {
    try {
      const { saleId } = req.params;
      await SaleItemService.deleteItemsBySale(Number(saleId));
      res.status(204).send();
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao excluir itens da venda.'
      );
    }
  }
}

export default new SaleItemController();