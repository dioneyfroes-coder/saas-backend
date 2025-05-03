//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\utils\PrismaTransport.ts
import Transport from 'winston-transport';
import { PrismaClient } from '@prisma/client';
import { LogType } from '../types/LogType'; // opcional para tipagem

const prisma = new PrismaClient();

export class PrismaTransport extends Transport {
  public async log(info: any, callback: () => void): Promise<void> {
    const { level, message, timestamp, stack } = info;

    await prisma.log.create({
      data: {
        level,
        message,
        timestamp: new Date(timestamp || Date.now()),
        stack: stack || null,
      },
    });

    callback();
  }
}