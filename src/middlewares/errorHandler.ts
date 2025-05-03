//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\middlewares\errorHandler.ts
import type { ErrorRequestHandler } from 'express';
import { logger } from '../utils/logger';
import { AppError } from '../errors/AppError';

export const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  // Caso seja um AppError, utiliza o statusCode específico, senão 500
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  // Registra o erro no logger
  logger.error({
    message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    error: message,
  });
  return;
};