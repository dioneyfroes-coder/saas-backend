import { Request, Response } from 'express';
import StockService from '../services/StockService';
import { NotFoundError, AppError } from '../errors/AppError';

class StockController {
  // Buscar todos os itens no estoque
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const stock = await StockService.getAllStock();
      res.json(stock);
    } catch (error) {
      throw new AppError('Erro ao buscar itens no estoque', 500);
    }
  }

  // Buscar um item por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const stock = await StockService.getStockById(Number(req.params.id));
      if (!stock) {
        throw new NotFoundError('Item não encontrado');
      }
      res.json(stock);
    } catch (error) {
      throw error; // Lança o erro para o middleware de tratamento de erros
    }
  }

  // Buscar um item por código de barras
  async getByBarcode(req: Request, res: Response): Promise<void> {
    try {
      const stock = await StockService.getStockByBarcode(req.params.barcode);
      if (stock) res.json(stock);
      else res.status(404).json({ message: 'Item não encontrado' });
    } catch (error) {
      throw error; // Lança o erro para o middleware de tratamento de erros
    }
  }

  // Criar um novo item no estoque
  async create(req: Request, res: Response): Promise<void> {
    try {
      const stock = await StockService.createStock(req.body);
      res.status(201).json(stock);
    } catch (error) {
      throw error; // Lança o erro para o middleware de tratamento de erros
    }
  }

  // Atualizar um item no estoque
  async update(req: Request, res: Response): Promise<void> {
    try {
      const stock = await StockService.updateStock(Number(req.params.id), req.body);
      if (stock) res.json(stock);
      else res.status(404).json({ message: 'Item não encontrado' });
    } catch (error) {
      throw error; // Lança o erro para o middleware de tratamento de erros
    }
  }

  // Excluir um item do estoque
  async delete(req: Request, res: Response): Promise<void> {
    try {
      await StockService.deleteStock(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      throw error; // Lança o erro para o middleware de tratamento de erros
    }
  }
}

export default new StockController();