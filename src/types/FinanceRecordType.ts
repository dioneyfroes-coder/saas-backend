export interface FinanceRecordType {
  id: number; // Identificador único do registro financeiro
  description: string; // Descrição do registro financeiro
  type: 'entrada' | 'saida'; // Tipo do registro: entrada ou saída
  value: number; // Valor do registro financeiro
  date: Date; // Data do registro financeiro
  tenantId: number; // Identificador do tenant associado ao registro
  category: 'Aluguel' | 'Vendas' | 'Marketing'; // Categoria do registro financeiro
  note?: string; // Nota opcional associada ao registro
  saleId?: number; // Identificador opcional de uma venda associada
  createdAt: Date; // Data de criação do registro
  updatedAt: Date; // Data de última atualização do registro
}