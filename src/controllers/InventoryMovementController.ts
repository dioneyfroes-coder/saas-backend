import { Request, Response } from 'express';
import InventoryMovementService from '../services/InventoryMovementService';

class InventoryMovementController {
  // Buscar movimentos de inventário por inventoryId
  async getMovementsByInventory(req: Request, res: Response): Promise<void> {
    const { inventoryId } = req.params;
    const { tenantId } = req;

    try {
      const movements = await InventoryMovementService.getMovementsByInventory(Number(inventoryId), tenantId!);
      res.json(movements);
    } catch (error) {
      console.error('Erro ao buscar movimentos de estoque:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  // Criar um novo movimento de inventário
  async createMovement(req: Request, res: Response): Promise<void> {
    const { tenantId } = req;
    const data = { ...req.body, tenantId };

    try {
      const movement = await InventoryMovementService.createMovement(data);
      res.status(201).json(movement);
    } catch (error) {
      console.error('Erro ao criar movimento de estoque:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

export default new InventoryMovementController();