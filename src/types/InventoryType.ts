export interface InventoryType {
  id: number; // Identificador único do inventário
  productId: number; // Identificador do produto associado
  tenantId: number; // Identificador do tenant associado
  quantity: number; // Quantidade disponível no inventário
  createdAt: Date; // Data de criação do registro
  updatedAt: Date; // Data de última atualização do registro
}