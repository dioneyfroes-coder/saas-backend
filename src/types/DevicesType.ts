export interface DeviceType {
    id: number;
    nome: string;
    tipo: 'estoque' | 'pdv' | 'admin' | 'outro';
    identificador: string;
    chaveSecreta?: string;
    ativo: boolean;
    tenantId: number;
    userId?: number;
    createdAt: Date;
    updatedAt: Date;
  }