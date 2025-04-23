// services/InventoryService.js
import Inventory from '../models/Inventory.js';
import InventoryMovement from '../models/InventoryMovement.js';

const InventoryService = {
  async getStockByProduct(productId, tenantId) {
    return await Inventory.findOne({ where: { productId, tenantId } });
  },

  async addStock(productId, quantity, tenantId, description = 'Entrada manual') {
    let inventory = await Inventory.findOne({ where: { productId, tenantId } });
    if (!inventory) {
      inventory = await Inventory.create({ productId, tenantId, quantity: 0 });
    }
    inventory.quantity += quantity;
    await inventory.save();

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
    const inventory = await Inventory.findOne({ where: { productId, tenantId } });
    if (!inventory || inventory.quantity < quantity) {
      throw new Error('Estoque insuficiente');
    }

    inventory.quantity -= quantity;
    await inventory.save();

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
    return await InventoryMovement.findAll({
      where: { inventoryId, tenantId },
      order: [['createdAt', 'DESC']],
    });
  }
};

export default InventoryService;
