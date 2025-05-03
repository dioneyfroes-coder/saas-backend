//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\middlewares\roleMiddleware.ts
import { RoleType } from '../types/RoleType'; // Importa o enum diretamente do Prisma
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/AuthTypes';

// Middleware de controle de acesso baseado em função
export function roleMiddleware(requiredRoles: RoleType[]) { // Alterado de Role[] para RoleType[]
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !req.user.role) {
      res.status(403).json({ error: 'Acesso negado. Usuário não identificado.' });
      return;
    }
    if (!requiredRoles.includes(req.user.role as RoleType)) {
      res.status(403).json({
        error: 'Acesso negado. Seu nível de permissão não é suficiente.',
      });
      return;
    }

    // Verifica se o role do usuário está incluso na lista de roles permitidas
    if (!requiredRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'Acesso negado. Seu nível de permissão não é suficiente.',
      });
      return;
    }

    next();
  };
}