export interface SaleItemType {
  id: number; // Identificador único do item da venda
  saleId: number; // Identificador da venda associada
  productId: number; // Identificador do produto associado
  tenantId: number; // Identificador do tenant associado
  quantity: number; // Quantidade do produto vendido
  price: number; // Preço unitário do produto
}