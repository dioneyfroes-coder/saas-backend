export interface SaleItemType {
  id: number; // Identificador único do item da venda
  saleId: number; // Identificador da venda associada
  stockId: number; // Identificador do item no estoque
  quantity: number; // Quantidade do item vendido
  price: number; // Preço unitário do item
}