export interface UserType {
  id: number; // Identificador único do usuário
  username: string; // Nome de usuário para login
  nomeCompleto: string; // Nome completo do usuário
  senha: string; // Senha do usuário (armazenada como hash)
  role: 'admin' | 'estoquista' | 'caixa'; // Função do usuário no sistema
  ativo: boolean; // Indica se o usuário está ativo
  tenantId: number; // Identificador do tenant associado
  createdAt: Date; // Data de criação do usuário
  updatedAt: Date; // Data de última atualização do usuário
}