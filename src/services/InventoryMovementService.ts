import InventoryMovementRepository from '../repositories/InventoryMovimentRepository';
import { InventoryMovementType } from '../types/InventoryMovementType';

const InventoryMovementService = {
  // Buscar todos os movimentos de inventário por inventoryId e tenantId
  async getMovementsByInventory(inventoryId: number, tenantId: number): Promise<InventoryMovementType[]> {
    return await InventoryMovementRepository.findAllByInventory(inventoryId, tenantId);
  },

  // Criar um novo movimento de inventário
  async createMovement(data: Omit<InventoryMovementType, 'id' | 'createdAt' | 'updatedAt'>): Promise<InventoryMovementType> {
    return await InventoryMovementRepository.create(data);
  },
};

export default InventoryMovementService;