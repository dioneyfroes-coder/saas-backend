import TenantRepository from "../repositories/TenantRepository";
import { TenantType } from "../types/TenantType";

const TenantService = {
  // Buscar todos os tenants
  async getAllTenants(): Promise<TenantType[]> {
    return await TenantRepository.findAll();
  },

  // Buscar um tenant por ID
  async getTenantById(id: number): Promise<TenantType | null> {
    return await TenantRepository.findById(id);
  },

  // Criar um novo tenant
  async createTenant(data: Omit<TenantType, "id" | "createdAt" | "updatedAt">): Promise<TenantType> {
    return await TenantRepository.create(data);
  },

  // Atualizar um tenant
  async updateTenant(id: number, data: Partial<Omit<TenantType, "id" | "createdAt" | "updatedAt">>): Promise<TenantType | null> {
    return await TenantRepository.update(id, data);
  },

  // Excluir um tenant
  async deleteTenant(id: number): Promise<boolean> {
    return await TenantRepository.delete(id);
  },
};

export default TenantService;