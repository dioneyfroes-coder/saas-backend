import Tenant from "../models/Tenant.js";

class TenantRepository {
  async findAll() {
    return await Tenant.findAll();
  }

  async findById(id) {
    return await Tenant.findByPk(id);
  }

  async create(data) {
    return await Tenant.create(data);
  }

  async update(id, data) {
    const tenant = await this.findById(id);
    if (!tenant) throw new Error("Tenant not found");
    await tenant.update(data);
    return tenant;
  }

  async delete(id) {
    const tenant = await this.findById(id);
    if (!tenant) throw new Error("Tenant not found");
    await tenant.destroy();
    return true;
  }
}

export default new TenantRepository();