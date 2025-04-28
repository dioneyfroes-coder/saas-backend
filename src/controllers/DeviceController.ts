import { Request, Response } from 'express';
import DeviceService from '../services/DeviceService.js';

class DeviceController {
  // Buscar todos os dispositivos
  async getAll(req: Request, res: Response): Promise<void> {
    const { tenantId } = req;
    try {
      const devices = await DeviceService.getAllDevices(tenantId!);
      res.json(devices);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar dispositivos', error });
    }
  }

  // Buscar dispositivo por ID
  async getById(req: Request, res: Response): Promise<void> {
    const { tenantId } = req;
    try {
      const device = await DeviceService.getDeviceById(Number(req.params.id), tenantId!);
      if (device) res.json(device);
      else res.status(404).json({ message: 'Dispositivo não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar dispositivo', error });
    }
  }

  // Criar um novo dispositivo
  async create(req: Request, res: Response): Promise<void> {
    const { tenantId } = req;
    try {
      const device = await DeviceService.createDevice(req.body, tenantId!);
      res.status(201).json(device);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar dispositivo', error });
    }
  }

  // Atualizar um dispositivo
  async update(req: Request, res: Response): Promise<void> {
    const { tenantId } = req;
    try {
      const device = await DeviceService.updateDevice(Number(req.params.id), req.body, tenantId!);
      if (device) res.json(device);
      else res.status(404).json({ message: 'Dispositivo não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar dispositivo', error });
    }
  }

  // Excluir um dispositivo
  async delete(req: Request, res: Response): Promise<void> {
    const { tenantId } = req;
    try {
      const success = await DeviceService.deleteDevice(Number(req.params.id), tenantId!);
      if (success) res.status(204).send();
      else res.status(404).json({ message: 'Dispositivo não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir dispositivo', error });
    }
  }

  // Autenticar dispositivo
  async authenticate(req: Request, res: Response): Promise<void> {
    const { tenantId } = req;
    const { identificador, chaveSecreta } = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'];

    try {
      const device = await DeviceService.authenticateDevice(identificador, chaveSecreta, ip as string, tenantId!);
      if (device) res.json(device);
      else res.status(401).json({ message: 'Dispositivo não autorizado ou inativo' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao autenticar dispositivo', error });
    }
  }

  // Buscar logs de acesso de um dispositivo
  async getAccessLogs(req: Request, res: Response): Promise<void> {
    const { tenantId } = req;
    const { id } = req.params;
    try {
      const logs = await DeviceService.getAccessLogs(Number(id), tenantId!);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar logs de acesso', error });
    }
  }
}

export default new DeviceController();