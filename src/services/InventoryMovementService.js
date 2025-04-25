// services/InventoryMovementService.js
import InventoryMovementRepository from '../repositories/InventoryMovimentRepository.js';

const InventoryMovementService = {
  async getMovementsByInventory(inventoryId, tenantId) {
    return await InventoryMovementRepository.findAllByInventory(inventoryId, tenantId);
  },

  async createMovement(data) {
    return await InventoryMovementRepository.create(data);
  },
};

export default InventoryMovementService;