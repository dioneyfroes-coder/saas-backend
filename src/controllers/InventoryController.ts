import { Request, Response } from 'express';
import InventoryService from '../services/InventoryService';

class InventoryController {
  // Buscar estoque por produto
  async getStock(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const { tenantId } = req;
    try {
      const stock = await InventoryService.getStockByProduct(Number(productId), tenantId!);
      res.json(stock || { quantity: 0 });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Adicionar estoque
  async addStock(req: Request, res: Response): Promise<void> {
    const { productId, quantity, description } = req.body;
    const { tenantId } = req;
    try {
      const updated = await InventoryService.addStock(Number(productId), quantity, tenantId!, description);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Remover estoque
  async removeStock(req: Request, res: Response): Promise<void> {
    const { productId, quantity, description } = req.body;
    const { tenantId } = req;
    try {
      const updated = await InventoryService.removeStock(Number(productId), quantity, tenantId!, 'saida', description);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // Buscar movimentos de inventário
  async getMovements(req: Request, res: Response): Promise<void> {
    const { inventoryId } = req.params;
    const { tenantId } = req;
    try {
      const movements = await InventoryService.getMovements(Number(inventoryId), tenantId!);
      res.json(movements);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new InventoryController();