//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\services\DeviceService.ts
import DeviceRepository from '../repositories/DeviceRepository';
import DeviceAccessLogRepository from '../repositories/DeviceAccessLogRepository';
import { DeviceType } from '../types/DevicesType';
import { LogDeviceAction } from '../decorators/LogDeviceAction';

class DeviceService {
  // Autenticar dispositivo
  async authenticateDevice(identificador: string, chaveSecreta: string | undefined, ip: string): Promise<DeviceType | null> {
    const device = await DeviceRepository.findByIdentificador(identificador);
    const sucesso = !!device && device.ativo && (!device.chaveSecreta || device.chaveSecreta === chaveSecreta);

    return sucesso ? device : null;
  }

  // Buscar todos os dispositivos
  async getAllDevices(): Promise<DeviceType[]> {
    return await DeviceRepository.findAll();
  }

  // Buscar dispositivo por ID
  async getDeviceById(id: number): Promise<DeviceType | null> {
    return await DeviceRepository.findById(id);
  }

  // Criar um novo dispositivo
   @LogDeviceAction()
  async createDevice(data: Omit<DeviceType, 'id' | 'createdAt' | 'updatedAt'>): Promise<DeviceType> {
    return await DeviceRepository.create(data);
  }

  // Atualizar um dispositivo
  @LogDeviceAction()
  async updateDevice(
    id: number,
    data: Partial<Omit<DeviceType, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<DeviceType | null> {
    return await DeviceRepository.update(id, data);
  }

  // Excluir um dispositivo
  async deleteDevice(id: number): Promise<boolean> {
    return await DeviceRepository.delete(id);
  }

  // Buscar logs de acesso de um dispositivo (exemplo)
  async getAccessLogs(deviceId: number): Promise<any[]> {
    const limit = 10; // Exemplo de limite
    const offset = 0; // Exemplo de offset
    return await DeviceAccessLogRepository.findAllByDevice(deviceId, limit, offset);
  }
}

export default new DeviceService();