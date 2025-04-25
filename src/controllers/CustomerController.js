import customerService from '../services/CustomerService.js';

class CustomerController {
  async create(req, res) {
    const tenantId = req.tenantId;
    const data = { ...req.body, tenantId };

    try {
      const customer = await customerService.createCustomer(data);
      res.status(201).json(customer);
    } catch (err) {
      res.status(500).json({ error: err.message || 'Erro ao criar cliente.' });
    }
  }

  async list(req, res) {
    try {
      const customers = await customerService.getCustomers(req.tenantId);
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: err.message || 'Erro ao buscar clientes.' });
    }
  }

  async getById(req, res) {
    try {
      const customer = await customerService.getCustomerById(req.params.id, req.tenantId);
      if (!customer) return res.status(404).json({ error: 'Cliente não encontrado.' });
      res.json(customer);
    } catch (err) {
      res.status(500).json({ error: err.message || 'Erro ao buscar cliente.' });
    }
  }

  async update(req, res) {
    try {
      const customer = await customerService.updateCustomer(req.params.id, req.tenantId, req.body);
      res.json(customer);
    } catch (err) {
      res.status(500).json({ error: err.message || 'Erro ao atualizar cliente.' });
    }
  }

  async remove(req, res) {
    try {
      await customerService.deleteCustomer(req.params.id, req.tenantId);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message || 'Erro ao remover cliente.' });
    }
  }
}

export default CustomerController();
