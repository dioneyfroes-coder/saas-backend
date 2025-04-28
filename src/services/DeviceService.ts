import DeviceRepository from '../repositories/DeviceRepository';
import DeviceAccessLogRepository from '../repositories/DeviceAccessLogRepository';
import { DeviceType } from '../types/DevicesType';

class DeviceService {
  // Autenticar dispositivo
  async authenticateDevice(
    identificador: string,
    chaveSecreta: string | undefined,
    ip: string,
    tenantId: number
  ): Promise<DeviceType | null> {
    const device = await DeviceRepository.findByIdentificador(identificador, tenantId);

    const sucesso = !!device && device.ativo && (!device.chaveSecreta || device.chaveSecreta === chaveSecreta);

    // Log de acesso
    await DeviceAccessLogRepository.create({
      mensagem: sucesso ? 'Autenticado com sucesso' : 'Falha na autenticação',
      deviceId: device ? device.id : null,
      tenantId,
      ip,
    });

    return sucesso ? device : null;
  }

  // Buscar todos os dispositivos de um tenant
  async getAllDevices(tenantId: number): Promise<DeviceType[]> {
    return await DeviceRepository.findAll(tenantId);
  }

  // Buscar dispositivo por ID
  async getDeviceById(id: number, tenantId: number): Promise<DeviceType | null> {
    return await DeviceRepository.findById(id, tenantId);
  }

  // Criar um novo dispositivo
  async createDevice(data: Omit<DeviceType, 'id' | 'createdAt' | 'updatedAt'>, tenantId: number): Promise<DeviceType> {
    return await DeviceRepository.create({ ...data, tenantId });
  }

  // Atualizar um dispositivo
  async updateDevice(
    id: number,
    data: Partial<Omit<DeviceType, 'id' | 'createdAt' | 'updatedAt'>>,
    tenantId: number
  ): Promise<DeviceType | null> {
    return await DeviceRepository.update(id, tenantId, data);
  }

  // Excluir um dispositivo
  async deleteDevice(id: number, tenantId: number): Promise<boolean> {
    return await DeviceRepository.delete(id, tenantId);
  }

  // Buscar logs de acesso de um dispositivo
  async getAccessLogs(deviceId: number, tenantId: number): Promise<any[]> {
    const limit = 10; // Example limit value
    const offset = 0; // Example offset value
    return await DeviceAccessLogRepository.findAllByDevice(deviceId, tenantId, limit, offset);
  }
}

export default new DeviceService();