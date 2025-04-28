import InventoryRepository from '../repositories/InventoryRepository';
import InventoryMovementRepository from '../repositories/InventoryMovimentRepository';
import { InventoryType } from '../types/InventoryType';

const InventoryService = {
  // Buscar estoque por produto
  async getStockByProduct(productId: number, tenantId: number): Promise<InventoryType | null> {
    return await InventoryRepository.findByProduct(productId, tenantId);
  },

  // Adicionar estoque
  async addStock(
    productId: number,
    quantity: number,
    tenantId: number,
    description: string = 'Entrada manual'
  ): Promise<InventoryType> {
    let inventory = await InventoryRepository.findByProduct(productId, tenantId);
    if (!inventory) {
      inventory = await InventoryRepository.create({ productId, tenantId, quantity: 0 });
    }
    if (!inventory) {
      throw new Error('Inventory not found');
    }

    inventory = await InventoryRepository.updateQuantity(inventory.id, tenantId, inventory.quantity + quantity);

    if (!inventory) {
      throw new Error('Failed to update inventory');
    }

    await InventoryMovementRepository.create({
      inventoryId: inventory.id,
      quantity,
      tenantId,
      type: 'entrada',
      description,
    });

    return inventory;
  },

  // Remover estoque
  async removeStock(
    productId: number,
    quantity: number,
    tenantId: number,
    type: 'saida' | 'venda' | 'ajuste' = 'saida',
    description: string = 'Saída manual'
  ): Promise<InventoryType> {
    const inventory = await InventoryRepository.findByProduct(productId, tenantId);
    if (!inventory || inventory.quantity < quantity) {
      throw new Error('Estoque insuficiente ou não pertence ao tenant');
    }

    const updatedInventory = await InventoryRepository.updateQuantity(
      inventory.id,
      tenantId,
      inventory.quantity - quantity
    );

    await InventoryMovementRepository.create({
      inventoryId: inventory.id,
      quantity,
      tenantId,
      type,
      description,
    });

    if (!updatedInventory) {
      throw new Error('Failed to update inventory');
    }
    return updatedInventory;
  },

  // Buscar movimentos de inventário
  async getMovements(inventoryId: number, tenantId: number): Promise<any[]> {
    return await InventoryRepository.findMovements(inventoryId, tenantId);
  },
};

export default InventoryService;