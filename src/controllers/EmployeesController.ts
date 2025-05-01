import { Request, Response } from 'express';
import EmployeesService from '../services/EmployeesService';

// Estender a interface Request para incluir tenantId
interface CustomRequest extends Request {
  tenantId: number;
}

class EmployeesController {
  // Criar um novo funcionário
  async create(req: CustomRequest, res: Response): Promise<void> {
    const tenantId = req.tenantId;
    const data = { ...req.body, tenantId };

    try {
      const employee = await EmployeesService.createEmployee(data);
      res.status(201).json(employee);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar funcionário.';
      res.status(500).json({ error: errorMessage });
    }
  }

  // Listar todos os funcionários de um tenant
  async list(req: CustomRequest, res: Response): Promise<void> {
    try {
      const employees = await EmployeesService.getEmployees(req.tenantId);
      res.json(employees);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar funcionários.';
      res.status(500).json({ error: errorMessage });
    }
  }

  // Buscar um funcionário por ID
  async getById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const employee = await EmployeesService.getEmployeeById(Number(req.params.id), req.tenantId);
      res.json(employee);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar funcionário.';
      const statusCode = errorMessage === 'Funcionário não encontrado' ? 404 : 500;
      res.status(statusCode).json({ error: errorMessage });
    }
  }

  // Atualizar um funcionário
  async update(req: CustomRequest, res: Response): Promise<void> {
    try {
      const employee = await EmployeesService.updateEmployee(Number(req.params.id), req.tenantId, req.body);
      res.json(employee);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar funcionário.';
      res.status(500).json({ error: errorMessage });
    }
  }

  // Remover um funcionário
  async remove(req: CustomRequest, res: Response): Promise<void> {
    try {
      await EmployeesService.deleteEmployee(Number(req.params.id), req.tenantId);
      res.status(204).send();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao remover funcionário.';
      res.status(500).json({ error: errorMessage });
    }
  }
}

export default new EmployeesController();