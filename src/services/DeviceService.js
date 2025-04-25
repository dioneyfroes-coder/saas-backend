import DeviceRepository from '../repositories/DeviceRepository.js';
import DeviceAccessLog from '../models/Device_Access_Log.js';

class DeviceService {
  async authenticateDevice(identificador, chaveSecreta, ip, tenantId) {
    const device = await DeviceRepository.findByIdentificador(identificador, tenantId);

    const sucesso = !!device && device.ativo && (!device.chaveSecreta || device.chaveSecreta === chaveSecreta);

    // Log de acesso
    await DeviceAccessLog.create({
      sucesso,
      deviceId: device ? device.id : null,
      tenantId,
      ip,
      mensagem: sucesso ? 'Autenticado com sucesso' : 'Falha na autenticação',
    });

    return sucesso ? device : null;
  }

  async getAllDevices(tenantId) {
    return await DeviceRepository.findAll(tenantId);
  }

  async getDeviceById(id, tenantId) {
    return await DeviceRepository.findById(id, tenantId);
  }

  async createDevice(data, tenantId) {
    return await DeviceRepository.create({ ...data, tenantId });
  }

  async updateDevice(id, data, tenantId) {
    return await DeviceRepository.update(id, data, tenantId);
  }

  async deleteDevice(id, tenantId) {
    return await DeviceRepository.delete(id, tenantId);
  }

  async getAccessLogs(deviceId, tenantId) {
    return await DeviceAccessLog.findAll({
      where: { deviceId, tenantId },
      order: [['accessedAt', 'DESC']],
    });
  }
}

export default new DeviceService();