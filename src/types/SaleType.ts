export interface SaleType {
  id: number; // Identificador único da venda
  tenantId: number; // Identificador do tenant associado
  userId?: number; // Identificador do usuário que realizou a venda
  total: number; // Valor total da venda
  status: 'pendente' | 'pago' | 'cancelado'; // Status da venda
  createdAt: Date; // Data de criação da venda
  updatedAt: Date; // Data de última atualização da venda
}