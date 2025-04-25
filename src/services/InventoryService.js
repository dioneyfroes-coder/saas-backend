// services/InventoryService.js
import InventoryRepository from '../repositories/InventoryRepository.js';
import InventoryMovement from '../models/InventoryMovement.js';

const InventoryService = {
  async getStockByProduct(productId, tenantId) {
    return await InventoryRepository.findByProduct(productId, tenantId);
  },

  async addStock(productId, quantity, tenantId, description = 'Entrada manual') {
    let inventory = await InventoryRepository.findByProduct(productId, tenantId);
    if (!inventory) {
      inventory = await InventoryRepository.create({ productId, tenantId, quantity: 0 });
    }
    inventory = await InventoryRepository.update(inventory, inventory.quantity + quantity);

    await InventoryMovement.create({
      inventoryId: inventory.id,
      quantity,
      tenantId,
      type: 'entrada',
      description,
    });

    return inventory;
  },

  async removeStock(productId, quantity, tenantId, type = 'saida', description = 'Saída manual') {
    const inventory = await InventoryRepository.findByProduct(productId, tenantId);
    if (!inventory || inventory.quantity < quantity) {
      throw new Error('Estoque insuficiente ou não pertence ao tenant');
    }

    inventory = await InventoryRepository.update(inventory, inventory.quantity - quantity);

    await InventoryMovement.create({
      inventoryId: inventory.id,
      quantity,
      tenantId,
      type,
      description,
    });

    return inventory;
  },

  async getMovements(inventoryId, tenantId) {
    return await InventoryRepository.findMovements(inventoryId, tenantId);
  },
};

export default InventoryService;