//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\controllers\EmployeesController.ts
import { Request, Response } from 'express';
import EmployeesService from '../services/EmployeesService';
import {
  NotFoundError,
  InternalServerError
} from '../errors/AppError';

interface CustomRequest extends Request {
  tenantId: number;
}

class EmployeesController {
  async create(req: CustomRequest, res: Response): Promise<void> {
    try {
      const data = { ...req.body, tenantId: req.tenantId };
      const employee = await EmployeesService.createEmployee(data);
      res.status(201).json(employee);
    } catch (err) {
      throw new InternalServerError(
        err instanceof Error ? err.message : 'Erro ao criar funcionário.'
      );
    }
  }

  async list(req: CustomRequest, res: Response): Promise<void> {
    try {
      const employees = await EmployeesService.getEmployees(req.tenantId);
      res.json(employees);
    } catch (err) {
      throw new InternalServerError(
        err instanceof Error ? err.message : 'Erro ao buscar funcionários.'
      );
    }
  }

  async getById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const employee = await EmployeesService.getEmployeeById(Number(req.params.id), req.tenantId);
      if (!employee) {
        throw new NotFoundError('Funcionário não encontrado.');
      }
      res.json(employee);
    } catch (err) {
      throw new InternalServerError(
        err instanceof Error ? err.message : 'Erro ao buscar funcionário.'
      );
    }
  }

  async update(req: CustomRequest, res: Response): Promise<void> {
    try {
      const employee = await EmployeesService.updateEmployee(Number(req.params.id), req.tenantId, req.body);
      if (!employee) {
        throw new NotFoundError('Funcionário não encontrado.');
      }
      res.json(employee);
    } catch (err) {
      throw new InternalServerError(
        err instanceof Error ? err.message : 'Erro ao atualizar funcionário.'
      );
    }
  }

  async remove(req: CustomRequest, res: Response): Promise<void> {
    try {
      await EmployeesService.deleteEmployee(Number(req.params.id), req.tenantId);
      res.status(204).send();
    } catch (err) {
      throw new InternalServerError(
        err instanceof Error ? err.message : 'Erro ao remover funcionário.'
      );
    }
  }
}

export default new EmployeesController();