import DeviceAccessLogRepository from '../repositories/DeviceAccessLogRepository.js';

const DeviceAccessLogService = {
  async getLogsByDevice(deviceId, tenantId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return await DeviceAccessLogRepository.findAllByDevice(deviceId, tenantId, limit, offset);
  },

  async createLog(data) {
    return await DeviceAccessLogRepository.create(data);
  },
};

export default DeviceAccessLogService;