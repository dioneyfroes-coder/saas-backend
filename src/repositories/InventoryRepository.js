// repositories/InventoryRepository.js
import Inventory from '../models/Inventories.js';

class InventoryRepository {
  async findByProduct(productId, tenantId) {
    return await Inventory.findOne({ where: { productId, tenantId } });
  }

  async create(data) {
    return await Inventory.create(data);
  }

  async update(inventory, quantity) {
    inventory.quantity = quantity;
    return await inventory.save();
  }

  async findMovements(inventoryId, tenantId) {
    return await InventoryMovement.findAll({
      where: { inventoryId, tenantId },
      order: [['createdAt', 'DESC']],
    });
  }
}

export default new InventoryRepository();