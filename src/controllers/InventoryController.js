// controllers/InventoryController.js
import InventoryService from '../services/InventoryService.js';

class InventoryController {
  async getStock(req, res) {
    const { productId } = req.params;
    const { tenantId } = req;
    const stock = await InventoryService.getStockByProduct(productId, tenantId);
    res.json(stock || { quantity: 0 });
  }

  async addStock(req, res) {
    const { productId, quantity, description } = req.body;
    const { tenantId } = req;
    const updated = await InventoryService.addStock(productId, quantity, tenantId, description);
    res.json(updated);
  }

  async removeStock(req, res) {
    const { productId, quantity, description } = req.body;
    const { tenantId } = req;
    try {
      const updated = await InventoryService.removeStock(productId, quantity, tenantId, 'saida', description);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getMovements(req, res) {
    const { inventoryId } = req.params;
    const { tenantId } = req;
    const movements = await InventoryService.getMovements(inventoryId, tenantId);
    res.json(movements);
  }
}

export default new InventoryController();
