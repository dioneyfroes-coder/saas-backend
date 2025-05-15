import { Request } from 'express';

export interface TokenPayload {
  employeesId: number;
  [key: string]: any; // Para propriedades adicionais
}

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload; // Adiciona os dados do token ao objeto Request
  deviceId?: number; // Adiciona o ID do dispositivo ao objeto Request
  [key: string]: any; // Para propriedades adicionais
}