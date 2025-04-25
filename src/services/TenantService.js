import TenantRepository from "../repositories/TenantRepository.js";

const TenantService = {
  async createTenant({ nome, plano }) {
    return await TenantRepository.create({ nome, plano });
  },

  async getAllTenants() {
    return await TenantRepository.findAll();
  },

  async getTenantById(id) {
    const tenant = await TenantRepository.findById(id);
    if (!tenant) throw new Error("Tenant not found");
    return tenant;
  },

  async updateTenant(id, data) {
    const tenant = await TenantRepository.update(id, data);
    if (!tenant) throw new Error("Tenant not found");
    return tenant;
  },

  async deleteTenant(id) {
    const deleted = await TenantRepository.delete(id);
    if (!deleted) throw new Error("Tenant not found");
  },
};

export default TenantService;