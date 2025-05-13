//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\middlewares\authMiddleware.ts
import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/tokenUtil';
import { AuthenticatedRequest } from '../types/AuthTypes';

/**
 * Middleware para autenticação de rotas protegidas.
 * Verifica o token JWT e adiciona os dados do usuário ao objeto `req`.
 */
export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho de autorização foi fornecido
  if (!authHeader) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  // Extrai o token do cabeçalho
  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Token inválido' });
    return;
  }

  try {
    // Verifica e decodifica o token
    const decoded = verifyToken(token);

    // Adiciona os dados do token ao objeto `req`
    req.user = decoded;

    // Adiciona campos específicos ao `req` (se necessário)
    req.employeesId = decoded.employeesId;
    req.deviceId = decoded.deviceId;
    req.role = decoded.role;

    next(); // Continua para o próximo middleware ou controlador
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(403).json({ error: 'Token inválido ou expirado' });
    return;
  }
}