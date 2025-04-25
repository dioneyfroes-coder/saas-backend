import Customer from '../models/Customer.js';

class CustomerRepository {
  async findAll(tenantId) {
    return await Customer.findAll({ where: { tenantId } });
  }

  async findById(id, tenantId) {
    return await Customer.findOne({ where: { id, tenantId } });
  }

  async create(data) {
    return await Customer.create(data);
  }

  async update(id, tenantId, data) {
    const customer = await this.findById(id, tenantId);
    if (!customer) throw new Error('Customer not found');
    await customer.update(data);
    return customer;
  }

  async delete(id, tenantId) {
    const customer = await this.findById(id, tenantId);
    if (!customer) throw new Error('Customer not found');
    await customer.destroy();
    return true;
  }
}

export default new CustomerRepository();