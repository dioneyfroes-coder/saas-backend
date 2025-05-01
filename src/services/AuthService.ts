import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/auth';
import { TokenPayload } from '../types/AuthTypes';

export class AuthService {
  static generateToken(payload: TokenPayload): string {
    return jwt.sign(
      payload,
      JWT_CONFIG.secret as jwt.Secret,
      {
        expiresIn: JWT_CONFIG.expiresIn as string | number,
        algorithm: 'HS256' // Adicione explicitamente o algoritmo
      }
    );
  }

  static verifyToken(token: string): TokenPayload {
    if (!token) throw new Error('Token não fornecido');
    
    try {
      const decoded = jwt.verify(token, JWT_CONFIG.secret, {
        algorithms: [JWT_CONFIG.algorithm]
      });
      
      if (typeof decoded === 'string') {
        throw new Error('Token malformado');
      }
      
      return decoded as TokenPayload;
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }
}