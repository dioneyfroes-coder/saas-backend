//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\middlewares\authMiddleware.ts
import { Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { AuthenticatedRequest } from '../types/AuthTypes';

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Token inválido' });
    return;
  }

  try {
    const decoded = AuthService.verifyToken(token);
    req.user = decoded;

    // Caso o payload do token contenha employeesId, adicionamos ao req
    // Ajuste conforme o que você inclui no token (ex.: { employeesId, role, etc. })
    req.employeesId = decoded.employeesId;

    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido ou expirado' });
    return;
  }
}