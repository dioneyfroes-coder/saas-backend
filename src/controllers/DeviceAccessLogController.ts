//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\controllers\DeviceAccessLogController.ts
import { Request, Response } from 'express';
import DeviceAccessLogService from '../services/DeviceAccessLogService';

class DeviceAccessLogController {
  // Buscar logs de acesso por dispositivo
  async getLogsByDeviceId(req: Request, res: Response): Promise<void> {
    try {
      const { deviceId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const logs = await DeviceAccessLogService.getLogsByDevice(Number(deviceId), page, limit);
      res.json(logs);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar logs.';
      res.status(500).json({ error: errorMessage });
    }
  }

  // Criar um novo log de acesso
  async createLog(req: Request, res: Response): Promise<void> {
    try {
      // Caso não haja tenantId, removemos essa propriedade
      // Para "deviceId" obrigatório, podemos obter de req.body
      const data = { ...req.body };

      const log = await DeviceAccessLogService.createLog(data);
      res.status(201).json(log);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar log.';
      res.status(500).json({ error: errorMessage });
    }
  }
}

export default new DeviceAccessLogController();