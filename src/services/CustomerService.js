import CustomerRepository from '../repositories/CustomerRepository.js';

const CustomerService = {
  async getCustomers(tenantId) {
    return await CustomerRepository.findAll(tenantId);
  },

  async getCustomerById(id, tenantId) {
    const customer = await CustomerRepository.findById(id, tenantId);
  if (!customer) throw new Error('Customer not found');
  return customer;
  },

  async createCustomer(data) {
    return await CustomerRepository.create(data);
  },

  async updateCustomer(id, tenantId, data) {
    return await CustomerRepository.update(id, tenantId, data);
  },

  async deleteCustomer(id, tenantId) {
    return await CustomerRepository.delete(id, tenantId);
  },
}

export default CustomerService;