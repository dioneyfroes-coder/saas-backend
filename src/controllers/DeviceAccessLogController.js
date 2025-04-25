import DeviceAccessLogService from '../services/DeviceAccessLogService.js';

class DeviceAccessLogController {
  async getLogsByDeviceId(req, res) {
    const { deviceId } = req.params;
    const { tenantId } = req;
    const { page = 1, limit = 10 } = req.query;

    try {
      const logs = await DeviceAccessLogService.getLogsByDevice(deviceId, tenantId, page, limit);
      res.json(logs);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async createLog(req, res) {
    const { tenantId } = req;
    const data = { ...req.body, tenantId };

    try {
      const log = await DeviceAccessLogService.createLog(data);
      res.status(201).json(log);
    } catch (error) {
      console.error('Erro ao criar log:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

export default new DeviceAccessLogController();