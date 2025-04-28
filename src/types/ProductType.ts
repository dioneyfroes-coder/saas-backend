export interface ProductType {
  id: number; // Identificador único do produto
  codigobarras: string; // Código de barras do produto
  name: string; // Nome do produto
  quantity: number; // Quantidade disponível no estoque
  price: number; // Preço do produto
  tenantId: number; // Identificador do tenant associado
}