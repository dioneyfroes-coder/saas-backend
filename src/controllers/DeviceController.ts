//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\controllers\DeviceController.ts
import { Request, Response } from 'express';
import DeviceService from '../services/DeviceService';

class DeviceController {
  // Buscar todos os dispositivos
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const devices = await DeviceService.getAllDevices();
      res.json(devices);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar dispositivos', error });
    }
  }

  // Buscar dispositivo por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const device = await DeviceService.getDeviceById(Number(req.params.id));
      if (device) res.json(device);
      else res.status(404).json({ message: 'Dispositivo não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar dispositivo', error });
    }
  }

  // Criar um novo dispositivo
  async create(req: Request, res: Response): Promise<void> {
    try {
      const device = await DeviceService.createDevice(req.body);
      res.status(201).json(device);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar dispositivo', error });
    }
  }

  // Atualizar um dispositivo
  async update(req: Request, res: Response): Promise<void> {
    try {
      const device = await DeviceService.updateDevice(Number(req.params.id), req.body);
      if (device) res.json(device);
      else res.status(404).json({ message: 'Dispositivo não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar dispositivo', error });
    }
  }

  // Excluir um dispositivo
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const success = await DeviceService.deleteDevice(Number(req.params.id));
      if (success) res.status(204).send();
      else res.status(404).json({ message: 'Dispositivo não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir dispositivo', error });
    }
  }

  // Autenticar dispositivo
  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      const { identificador, chaveSecreta } = req.body;
      // Ip pode vir de req.ip ou cabeçalho
      const ip = req.ip || req.headers['x-forwarded-for'];

      const device = await DeviceService.authenticateDevice(identificador, chaveSecreta, ip as string);
      if (device) res.json(device);
      else res.status(401).json({ message: 'Dispositivo não autorizado ou inativo' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao autenticar dispositivo', error });
    }
  }

  // Buscar logs de acesso de um dispositivo
  async getAccessLogs(req: Request, res: Response): Promise<void> {
    try {
      const logs = await DeviceService.getAccessLogs(Number(req.params.id));
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar logs de acesso', error });
    }
  }
}

export default new DeviceController();