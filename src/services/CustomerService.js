import Customer from '../models/Customer.js';

export const createCustomer = async (data) => {
  return await Customer.create(data);
};

export const getCustomers = async (tenantId) => {
  return await Customer.findAll({ where: { tenantId } });
};

export const getCustomerById = async (id, tenantId) => {
  return await Customer.findOne({ where: { id, tenantId } });
};

export const updateCustomer = async (id, tenantId, data) => {
  return await Customer.update(data, { where: { id, tenantId } });
};

export const deleteCustomer = async (id, tenantId) => {
  return await Customer.destroy({ where: { id, tenantId } });
};
