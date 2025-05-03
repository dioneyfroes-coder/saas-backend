/*
import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include employeesId
declare global {
  namespace Express {
    interface Request {
      employeesId?: number;
    }
  }
}

export const employeeMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Exemplo: Extrair employeesId de um cabeçalho ou token
    const employeesId = req.headers['x-employee-id']; // Substitua pela lógica real

    if (!employeesId) {
      res.status(401).json({ message: 'Funcionário não autenticado' });
      return;
    }

    // Adicionar employeesId ao objeto req
    req.employeesId = Number(employeesId);

    next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar autenticação do funcionário' });
  }
};
*/