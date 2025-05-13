//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\controllers\DeviceController.ts
import { Request, Response } from 'express';
import DeviceService from '../services/DeviceService';
import {
  NotFoundError,
  InternalServerError,
  UnauthorizedError
} from '../errors/AppError';
import DeviceRepository from '../repositories/DeviceRepository';
import DeviceAccessLogRepository from '../repositories/DeviceAccessLogRepository';
import { DeviceType } from '../types/DevicesType';
import { AuthService } from '../services/AuthService';
import { generateToken } from '../utils/tokenUtil';

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

      // Registrar log de criação
    await DeviceAccessLogRepository.create({
      deviceId: device.id,
      ip: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown',
    });
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

      // Registrar log de alteração
    await DeviceAccessLogRepository.create({
      deviceId: device.id,
      ip: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown',
    });
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

      if (!identificador || !chaveSecreta) {
        res.status(400).json({ message: 'Identificador e chaveSecreta são obrigatórios.' });
        return;
      }

      // Verifica se o dispositivo existe
      const device = await DeviceRepository.findByIdentificador(identificador);
      if (!device || device.chaveSecreta !== chaveSecreta) {
        res.status(401).json({ message: 'Dispositivo não autorizado.' });
        return;
      }

// Gera o token para o dispositivo
      const token = generateToken({
        deviceId: device.id,
        role: device.tipo,
        employeesId: device.employeesId,
      });

      // Atualiza o token no banco de dados
      await DeviceRepository.updateToken(identificador, token);

      // Retorna o token para o frontend
      res.status(200).json({ message: 'Autenticação realizada com sucesso.', token });
    } catch (error) {
      console.error('Erro ao autenticar dispositivo:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
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

  // Atualizar o token de um dispositivo
  async updateToken(req: Request, res: Response): Promise<void> {
    try {
      const { identificador, token } = req.body;

      if (!identificador || !token) {
        res.status(400).json({ message: 'Identificador e token são obrigatórios.' });
        return;
      }

      const device = await DeviceRepository.updateToken(identificador, token);

      if (!device) {
        throw new NotFoundError('Dispositivo não encontrado.');
      }

      res.status(200).json({ message: 'Token atualizado com sucesso.', device });
    } catch (error) {
      throw new InternalServerError(
        error instanceof Error ? error.message : 'Erro ao atualizar token.'
      );
    }
  }
}

export default new DeviceController();