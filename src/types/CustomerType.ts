export interface CustomerType {
    id: number;
    tenantId: number;
    name: string;
    document?: string;
    email?: string;
    phone?: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
  }