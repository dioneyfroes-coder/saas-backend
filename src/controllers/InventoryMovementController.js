// controllers/InventoryMovementController.js
import InventoryMovementService from '../services/InventoryMovementService.js';

class InventoryMovementController {
  async getMovementsByInventory(req, res) {
    const { inventoryId } = req.params;
    const { tenantId } = req;

    try {
      const movements = await InventoryMovementService.getMovementsByInventory(inventoryId, tenantId);
      res.json(movements);
    } catch (error) {
      console.error('Erro ao buscar movimentos de estoque:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async createMovement(req, res) {
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