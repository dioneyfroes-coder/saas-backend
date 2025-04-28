import { Request, Response, NextFunction } from 'express';

// Extender a interface Request para incluir tenantId e user
declare global {
  namespace Express {
    interface Request {
      tenantId?: number;
      user?: { tenantId?: number }; // Ajuste conforme a estrutura do seu `req.user`
    }
  }
}

export const tenantMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Obter o usuário autenticado (exemplo: de um token JWT ou sessão)
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: 'Acesso negado: usuário não autenticado' });
      return; // Adicionamos `return` para garantir que o fluxo seja interrompido
    }

    if (!user.tenantId) {
      res.status(403).json({ message: 'Acesso negado: tenant não identificado' });
      return; // Adicionamos `return` para garantir que o fluxo seja interrompido
    }

    // Adiciona o tenantId ao objeto da requisição
    req.tenantId = user.tenantId;
    next();
  } catch (error) {
    console.error('Erro no tenantMiddleware:', error);
    res.status(500).json({ message: 'Erro interno no middleware de tenant' });
  }
};