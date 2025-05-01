//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\types\FinanceRecordType.ts
export interface FinanceType {
  id: number;               
  description: string;      // Descrição do registro financeiro
  type: 'income' | 'expense'; // Tipo do registro (entrada -> income, saída -> expense)
  value: number;            // Valor do registro
  date: Date;               // Data do registro
  category: 'rent' | 'sales' | 'marketing' | 'other'; // Categoria do registro
  note?: string;            // Nota opcional
  createdAt: Date;          // Data de criação do registro
  updatedAt: Date;          // Data de última atualização do registro
}