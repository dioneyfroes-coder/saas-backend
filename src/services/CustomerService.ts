import CustomerRepository from '../repositories/CustomerRepository.js';
import { CustomerType } from '../types/CustomerType';

const CustomerService = {
  // Buscar todos os clientes de um tenant
  async getCustomers(tenantId: number): Promise<CustomerType[]> {
    return await CustomerRepository.findAll(tenantId);
  },

  // Buscar um cliente por ID e tenant
  async getCustomerById(id: number, tenantId: number): Promise<CustomerType> {
    const customer = await CustomerRepository.findById(id, tenantId);
    if (!customer) throw new Error('Cliente não encontrado');
    return customer;
  },

  // Criar um novo cliente
  async createCustomer(data: Omit<CustomerType, 'id' | 'createdAt' | 'updatedAt'>): Promise<CustomerType> {
    return await CustomerRepository.create(data);
  },

  // Atualizar um cliente
  async updateCustomer(
    id: number,
    tenantId: number,
    data: Partial<Omit<CustomerType, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>>
  ): Promise<CustomerType> {
    const updatedCustomer = await CustomerRepository.update(id, tenantId, data);
    if (!updatedCustomer) throw new Error('Falha ao atualizar o cliente');
    return updatedCustomer;
  },

  // Excluir um cliente
  async deleteCustomer(id: number, tenantId: number): Promise<void> {
    const customer = await CustomerRepository.findById(id, tenantId);
    if (!customer) throw new Error('Cliente não encontrado');
    await CustomerRepository.delete(id, tenantId);
  },
};

export default CustomerService;