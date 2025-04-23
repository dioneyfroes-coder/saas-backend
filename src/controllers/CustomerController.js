import * as customerService from '../services/CustomerService.js';

export const create = async (req, res) => {
  const tenantId = req.tenantId;
  const data = { ...req.body, tenantId };

  try {
    const customer = await customerService.createCustomer(data);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar cliente.' });
  }
};

export const list = async (req, res) => {
  try {
    const customers = await customerService.getCustomers(req.tenantId);
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
};

export const getById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id, req.tenantId);
    if (!customer) return res.status(404).json({ error: 'Cliente não encontrado.' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar cliente.' });
  }
};

export const update = async (req, res) => {
  try {
    await customerService.updateCustomer(req.params.id, req.tenantId, req.body);
    res.json({ message: 'Cliente atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar cliente.' });
  }
};

export const remove = async (req, res) => {
  try {
    await customerService.deleteCustomer(req.params.id, req.tenantId);
    res.json({ message: 'Cliente removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover cliente.' });
  }
};
