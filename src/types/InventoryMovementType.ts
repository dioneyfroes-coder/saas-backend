export interface InventoryMovementType {
  id: number; // Identificador único do movimento de inventário
  inventoryId: number; // Identificador do inventário associado
  tenantId: number; // Identificador do tenant associado
  type: 'entrada' | 'saida' | 'venda' | 'ajuste'; // Tipo do movimento
  quantity: number; // Quantidade movimentada
  description?: string; // Descrição opcional do movimento
  createdAt: Date; // Data de criação do movimento
  updatedAt: Date; // Data de última atualização do movimento
}