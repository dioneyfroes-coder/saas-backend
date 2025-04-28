import { Request, Response } from 'express';
import CustomerService from '../services/CustomerService.js';

// Estender a interface Request para incluir tenantId
interface CustomRequest extends Request {
  tenantId: number;
}

class CustomerController {
  // Criar um novo cliente
  async create(req: CustomRequest, res: Response): Promise<void> {
    const tenantId = req.tenantId;
    const data = { ...req.body, tenantId };

    try {
      const customer = await CustomerService.createCustomer(data);
      res.status(201).json(customer);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar cliente.';
      res.status(500).json({ error: errorMessage });
    }
  }

  // Listar todos os clientes de um tenant
  async list(req: CustomRequest, res: Response): Promise<void> {
    try {
      const customers = await CustomerService.getCustomers(req.tenantId);
      res.json(customers);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar clientes.';
      res.status(500).json({ error: errorMessage });
    }
  }

  // Buscar um cliente por ID
  async getById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const customer = await CustomerService.getCustomerById(Number(req.params.id), req.tenantId);
      res.json(customer);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar cliente.';
      const statusCode = errorMessage === 'Cliente não encontrado' ? 404 : 500;
      res.status(statusCode).json({ error: errorMessage });
    }
  }

  // Atualizar um cliente
  async update(req: CustomRequest, res: Response): Promise<void> {
    try {
      const customer = await CustomerService.updateCustomer(Number(req.params.id), req.tenantId, req.body);
      res.json(customer);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar cliente.';
      res.status(500).json({ error: errorMessage });
    }
  }

  // Remover um cliente
  async remove(req: CustomRequest, res: Response): Promise<void> {
    try {
      await CustomerService.deleteCustomer(Number(req.params.id), req.tenantId);
      res.status(204).send();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao remover cliente.';
      res.status(500).json({ error: errorMessage });
    }
  }
}

export default new CustomerController();