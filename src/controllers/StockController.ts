import { Request, Response } from 'express';
import StockService from '../services/StockService';

class StockController {
  // Buscar todos os itens no estoque
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const stock = await StockService.getAllStock();
      res.json(stock);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar itens no estoque', error: (error as Error).message });
    }
  }

  // Buscar um item por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const stock = await StockService.getStockById(Number(req.params.id));
      if (stock) res.json(stock);
      else res.status(404).json({ message: 'Item não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar item', error: (error as Error).message });
    }
  }

  // Buscar um item por código de barras
  async getByBarcode(req: Request, res: Response): Promise<void> {
    try {
      const stock = await StockService.getStockByBarcode(req.params.barcode);
      if (stock) res.json(stock);
      else res.status(404).json({ message: 'Item não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar item por código de barras', error: (error as Error).message });
    }
  }

  // Criar um novo item no estoque
  async create(req: Request, res: Response): Promise<void> {
    try {
      const stock = await StockService.createStock(req.body);
      res.status(201).json(stock);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar item no estoque', error: (error as Error).message });
    }
  }

  // Atualizar um item no estoque
  async update(req: Request, res: Response): Promise<void> {
    try {
      const stock = await StockService.updateStock(Number(req.params.id), req.body);
      if (stock) res.json(stock);
      else res.status(404).json({ message: 'Item não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar item', error: (error as Error).message });
    }
  }

  // Excluir um item do estoque
  async delete(req: Request, res: Response): Promise<void> {
    try {
      await StockService.deleteStock(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir item', error: (error as Error).message });
    }
  }
}

export default new StockController();