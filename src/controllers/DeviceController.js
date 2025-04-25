import DeviceService from '../services/DeviceService.js';

class DeviceController {
  async getAll(req, res) {
    const { tenantId } = req;
    try {
      const devices = await DeviceService.getAllDevices(tenantId);
      res.json(devices);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar dispositivos', error });
    }
  }

  async getById(req, res) {
    const { tenantId } = req;
    try {
      const device = await DeviceService.getDeviceById(req.params.id, tenantId);
      if (device) res.json(device);
      else res.status(404).json({ message: 'Dispositivo não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar dispositivo', error });
    }
  }

  async create(req, res) {
    const { tenantId } = req;
    try {
      const device = await DeviceService.createDevice(req.body, tenantId);
      res.status(201).json(device);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar dispositivo', error });
    }
  }

  async update(req, res) {
    const { tenantId } = req;
    try {
      const device = await DeviceService.updateDevice(req.params.id, req.body, tenantId);
      if (device) res.json(device);
      else res.status(404).json({ message: 'Dispositivo não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar dispositivo', error });
    }
  }

  async delete(req, res) {
    const { tenantId } = req;
    try {
      const success = await DeviceService.deleteDevice(req.params.id, tenantId);
      if (success) res.status(204).send();
      else res.status(404).json({ message: 'Dispositivo não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir dispositivo', error });
    }
  }

  async authenticate(req, res) {
    const { tenantId } = req;
    const { identificador, chaveSecreta } = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'];

    try {
      const device = await DeviceService.authenticateDevice(identificador, chaveSecreta, ip, tenantId);
      if (device) res.json(device);
      else res.status(401).json({ message: 'Dispositivo não autorizado ou inativo' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao autenticar dispositivo', error });
    }
  }

  async getAccessLogs(req, res) {
    const { tenantId } = req;
    const { id } = req.params;
    try {
      const logs = await DeviceService.getAccessLogs(id, tenantId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar logs de acesso', error });
    }
  }
}

export default new DeviceController();