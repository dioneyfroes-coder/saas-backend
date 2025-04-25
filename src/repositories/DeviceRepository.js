import Device from '../models/Device.js';

class DeviceRepository {
  async findAll(tenantId) {
    return await Device.findAll({ where: { tenantId } });
  }

  async findById(id, tenantId) {
    return await Device.findOne({ where: { id, tenantId } });
  }

  async findByIdentificador(identificador, tenantId) {
    return await Device.findOne({
      where: { identificador, tenantId },
      include: [{ association: 'usuarioResponsavel' }],
    });
  }

  async create(data) {
    return await Device.create(data);
  }

  async update(id, data, tenantId) {
    const device = await this.findById(id, tenantId);
    if (!device) throw new Error('Dispositivo não encontrado');
    await device.update(data);
    return device;
  }

  async delete(id, tenantId) {
    const device = await this.findById(id, tenantId);
    if (!device) throw new Error('Dispositivo não encontrado');
    await device.destroy();
    return true;
  }
}

export default new DeviceRepository();