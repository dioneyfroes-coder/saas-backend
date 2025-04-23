import DeviceAccessLog from '../models/DeviceAccessLog.js';

class DeviceAccessLogController {
  async getLogsByDeviceId(req, res) {
    const { deviceId } = req.params;
    const { tenantId } = req;

    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const logs = await DeviceAccessLog.findAll({
        where: { deviceId, tenantId },
        order: [['accessedAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      res.json(logs);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

export default new DeviceAccessLogController();