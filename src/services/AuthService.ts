//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\services\AuthService.ts
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/auth';
import { TokenPayload } from '../types/AuthTypes';

export class AuthService {
  static generateToken(payload: TokenPayload): string {
    // Garante que JWT_CONFIG.secret seja uma string não vazia
    if (!JWT_CONFIG.secret) {
      throw new Error('JWT secret não configurado corretamente');
    }

    // Força o expiresIn a ser aceito como string ou number
    const expires: number = Number(JWT_CONFIG.expiresIn);

    const secretKey: Secret = JWT_CONFIG.secret;
    const options: SignOptions = {
      expiresIn: expires,
      algorithm: 'HS256',
    };

    // jwt.sign() aceita string | object | Buffer como payload
    return jwt.sign(
      { ...payload },   // espalha as propriedades do payload
      secretKey,
      options
    );
  }

  static verifyToken(token: string): TokenPayload {
    if (!token) {
      throw new Error('Token não fornecido');
    }

    if (!JWT_CONFIG.secret) {
      throw new Error('JWT secret não configurado corretamente');
    }

    const decoded = jwt.verify(token, JWT_CONFIG.secret, {
      algorithms: ['HS256'],
    });

    if (typeof decoded === 'string') {
      throw new Error('Token malformado');
    }

    // Convertendo para nosso tipo esperado
    return decoded as TokenPayload;
  }
}