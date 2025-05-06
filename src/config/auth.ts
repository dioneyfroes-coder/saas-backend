import { config } from 'dotenv';
config(); // Carrega as variáveis de ambiente do arquivo .env

if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
  throw new Error('JWT_SECRET e JWT_EXPIRES_IN devem estar definidos no arquivo .env');
}

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  expiresIn: process.env.JWT_EXPIRES_IN || '36000',
  algorithm: 'HS256' as const, // Tipo literal
};