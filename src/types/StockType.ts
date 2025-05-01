export interface StockType {
  id: number; // Identificador único do item no estoque
  barcode?: string; // Código de barras do item (opcional)
  name: string; // Nome do item
  quantity: number; // Quantidade disponível no estoque
  price: number; // Preço unitário
  description?: string; // Descrição opcional
  createdAt: Date; // Data de criação
  updatedAt: Date; // Data de atualização
}