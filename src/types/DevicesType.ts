//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\types\DevicesType.ts
export interface DeviceType {
  id: number;
  nome: string;
  tipo: 'estoque' | 'pdv' | 'admin' | 'financeiro' | 'rh' | 'totem' | 'terminal_preco' | 'pc_financeiro' | 'pc_rh' | 'pc_gerencia' | 'pc_atendimento' | 'outro' | 'super_admin';
  identificador: string;
  chaveSecreta?: string;
  ativo: boolean;
  employeesId?: number;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}