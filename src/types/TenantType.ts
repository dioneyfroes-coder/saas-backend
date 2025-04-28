export interface TenantType {
  id: number; // Identificador único do tenant
  nome: string; // Nome do tenant
  plano: string; // Plano do tenant (ex.: "free", "premium")
  status: string; // Status do tenant (ex.: "ativo", "inativo")
  createdAt: Date; // Data de criação do tenant
  updatedAt: Date; // Data de última atualização do tenant
}