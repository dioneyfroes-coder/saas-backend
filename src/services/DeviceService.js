import DeviceRepository from '../repositories/DeviceRepository.js';
import DeviceAccessLog from '../models/DeviceAccessLog.js';

class DeviceService {
    
    async authenticateDevice(identificador, chaveSecreta, ip) {
        const device = await DeviceRepository.findByIdentificador(identificador);

        const sucesso = !!device && device.ativo && (!device.chaveSecreta || device.chaveSecreta === chaveSecreta);

        // log de acesso
        await DeviceAccessLog.create({
            sucesso,
            deviceId: device ? device.id : null,
            ip,
            mensagem: sucesso ? 'Autenticado com sucesso' : 'Falha na autenticação'
        });

        return sucesso ? device : null;
    }

    async getAllDevices() {
        return await DeviceRepository.findAll();
    }

    async getDeviceById(id) {
        return await DeviceRepository.findById(id);
    }

    async getDeviceByIdentificador(identificador) {
        return await DeviceRepository.findByIdentificador(identificador);
    }

    async createDevice(data) {
        return await DeviceRepository.create(data);
    }

    async updateDevice(id, data) {
        return await DeviceRepository.update(id, data);
    }

    async deleteDevice(id) {
        return await DeviceRepository.delete(id);
    }
}

export default new DeviceService();
