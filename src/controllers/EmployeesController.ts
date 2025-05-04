//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\controllers\EmployeesController.ts
import { Request, Response } from 'express';
import EmployeesService from '../services/EmployeesService';
import {
  NotFoundError,
  InternalServerError
} from '../errors/AppError';
import { RegisterEmployeeDTO } from '../types/RegisterEmployeeDTOType';

class EmployeesController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body as RegisterEmployeeDTO;
      const employee = await EmployeesService.createEmployee(body);
      res.status(201).json(employee);
    } catch (err) {
      throw new InternalServerError(
        err instanceof Error ? err.message : 'Erro ao criar funcionário.'
      );
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const employees = await EmployeesService.getEmployees();
      res.json(employees);
    } catch (err) {
      throw new InternalServerError(
        err instanceof Error ? err.message : 'Erro ao buscar funcionários.'
      );
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const employee = await EmployeesService.getEmployeeById(Number(req.params.id));
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

  async update(req: Request, res: Response): Promise<void> {
    try {
      const employee = await EmployeesService.updateEmployee(Number(req.params.id), req.body);
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

  async remove(req: Request, res: Response): Promise<void> {
    try {
      await EmployeesService.deleteEmployee(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      throw new InternalServerError(
        err instanceof Error ? err.message : 'Erro ao remover funcionário.'
      );
    }
  }
}

export default new EmployeesController();