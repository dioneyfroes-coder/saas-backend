//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\controllers\DeviceController.ts
import { Request, Response } from 'express';
import DeviceService from '../services/DeviceService';
import {
  NotFoundError,
  InternalServerError,
  UnauthorizedError
} from '../errors/AppError';

class DeviceController {
  // Buscar todos os dispositivos
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const devices = await DeviceService.getAllDevices();
      res.json(devices);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao buscar dispositivos'
      );
    }
  }

  // Buscar dispositivo por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const device = await DeviceService.getDeviceById(Number(req.params.id));
      if (!device) {
        throw new NotFoundError('Dispositivo não encontrado');
      }
      res.json(device);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao buscar dispositivo'
      );
    }
  }

  // Criar um novo dispositivo
  async create(req: Request, res: Response): Promise<void> {
    try {
      const device = await DeviceService.createDevice(req.body);
      res.status(201).json(device);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao criar dispositivo'
      );
    }
  }

  // Atualizar um dispositivo
  async update(req: Request, res: Response): Promise<void> {
    try {
      const device = await DeviceService.updateDevice(Number(req.params.id), req.body);
      if (!device) {
        throw new NotFoundError('Dispositivo não encontrado');
      }
      res.json(device);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao atualizar dispositivo'
      );
    }
  }

  // Excluir um dispositivo
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const success = await DeviceService.deleteDevice(Number(req.params.id));
      if (!success) {
        throw new NotFoundError('Dispositivo não encontrado');
      }
      res.status(204).send();
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao excluir dispositivo'
      );
    }
  }

  // Autenticar dispositivo
  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      const { identificador, chaveSecreta } = req.body;
      const ip = req.ip || req.headers['x-forwarded-for'];
      const device = await DeviceService.authenticateDevice(identificador, chaveSecreta, ip as string);

      if (!device) {
        throw new UnauthorizedError('Dispositivo não autorizado ou inativo');
      }
      res.json(device);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao autenticar dispositivo'
      );
    }
  }

  // Buscar logs de acesso de um dispositivo
  async getAccessLogs(req: Request, res: Response): Promise<void> {
    try {
      const logs = await DeviceService.getAccessLogs(Number(req.params.id));
      res.json(logs);
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao buscar logs de acesso'
      );
    }
  }
}

export default new DeviceController();