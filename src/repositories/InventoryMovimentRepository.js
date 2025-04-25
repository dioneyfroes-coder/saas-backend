// repositories/InventoryMovimentRepository.js
import InventoryMovement from '../models/Inventory_Movement.js';

class InventoryMovementRepository {
  async findAllByInventory(inventoryId, tenantId) {
    return await InventoryMovement.findAll({
      where: { inventoryId, tenantId },
      order: [['createdAt', 'DESC']],
    });
  }

  async create(data) {
    return await InventoryMovement.create(data);
  }
}

export default new InventoryMovementRepository();