export interface SaleType {
  id: number; // Identificador único da venda
  employeesId?: number; // Identificador do funcionário que realizou a venda
  total: number; // Valor total da venda
  status: 'pendente' | 'pago' | 'cancelado'; // Status da venda
  createdAt: Date; // Data de criação da venda
  updatedAt: Date; // Data de última atualização da venda
}