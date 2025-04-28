import { Request, Response } from 'express';
import DeviceAccessLogService from '../services/DeviceAccessLogService.js';

class DeviceAccessLogController {
  // Buscar logs de acesso por dispositivo
  async getLogsByDeviceId(req: Request, res: Response): Promise<void> {
    const { deviceId } = req.params;
    const tenantId = req.tenantId;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    try {
      const logs = await DeviceAccessLogService.getLogsByDevice(Number(deviceId), tenantId!, page, limit);
      res.json(logs);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar logs.';
      res.status(500).json({ error: errorMessage });
    }
  }

  // Criar um novo log de acesso
  async createLog(req: Request, res: Response): Promise<void> {
    const tenantId = req.tenantId;
    const data = { ...req.body, tenantId };

    try {
      const log = await DeviceAccessLogService.createLog(data);
      res.status(201).json(log);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar log.';
      res.status(500).json({ error: errorMessage });
    }
  }
}

export default new DeviceAccessLogController();