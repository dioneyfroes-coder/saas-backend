//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\utils\tokenUtil.ts
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/auth';
import { TokenPayload } from '../types/AuthTypes';

/**
 * Gera um token JWT com base no payload fornecido.
 * @param payload Dados que serão incluídos no token.
 * @returns Token JWT assinado.
 */
export function generateToken(payload: TokenPayload): string {
  if (!JWT_CONFIG.secret) {
    throw new Error('JWT secret não configurado corretamente.');
  }

  return jwt.sign(payload, JWT_CONFIG.secret, {
    expiresIn: JWT_CONFIG.expiresIn,
    algorithm: JWT_CONFIG.algorithm,
  });
};

export function verifyToken(token: string): TokenPayload {
  if (!JWT_CONFIG.secret) {
    throw new Error('JWT secret não configurado corretamente.');
  }

  try {
    return jwt.verify(token, JWT_CONFIG.secret) as TokenPayload;
  } catch (error) {
    throw new Error('Token inválido ou expirado.');
  }
}