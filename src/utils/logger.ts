//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\utils\logger.ts
import { createLogger, format, transports } from 'winston';
import { PrismaTransport } from './PrismaTransport';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new PrismaTransport(),
  ],
});