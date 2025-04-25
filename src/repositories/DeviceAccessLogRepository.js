import DeviceAccessLog from '../models/Device_Access_Log.js';

class DeviceAccessLogRepository {
  async findAllByDevice(deviceId, tenantId, limit, offset) {
    return await DeviceAccessLog.findAll({
      where: { deviceId, tenantId },
      order: [['accessedAt', 'DESC']],
      limit,
      offset,
    });
  }

  async create(data) {
    return await DeviceAccessLog.create(data);
  }
}

export default new DeviceAccessLogRepository();