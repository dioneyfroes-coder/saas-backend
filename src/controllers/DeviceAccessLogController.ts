//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\controllers\DeviceAccessLogController.ts
import { Request, Response } from 'express';
import DeviceAccessLogService from '../services/DeviceAccessLogService';
import { InternalServerError } from '../errors/AppError';

class DeviceAccessLogController {
  async getAllLogs(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const logs = await DeviceAccessLogService.getAllLogs(page, limit);
      res.status(200).json(logs);
    } catch (err) {
      throw new InternalServerError(
        err instanceof Error ? err.message : 'Erro ao buscar logs.'
      );
    }
  }

  async getLogsByDeviceId(req: Request, res: Response): Promise<void> {
    try {
      const { deviceId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const logs = await DeviceAccessLogService.getLogsByDevice(Number(deviceId), page, limit);
      res.status(200).json(logs);
    } catch (err) {
      throw new InternalServerError(
        err instanceof Error ? err.message : 'Erro ao buscar logs por dispositivo.'
      );
    }
  }

  async createLog(req: Request, res: Response): Promise<void> {
    try {
      const { deviceId, ip, userAgent } = req.body;

      if (!deviceId) {
        res.status(400).json({ message: 'O campo deviceId é obrigatório.' });
        return;
      }

      const log = await DeviceAccessLogService.createLog({
        deviceId,
        ip,
        userAgent,
      });

      res.status(201).json(log);
    } catch (err) {
      throw new InternalServerError(
        err instanceof Error ? err.message : 'Erro ao criar log.'
      );
    }
  }
}

export default new DeviceAccessLogController();