//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\controllers\AuthController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import DeviceAccessLogService from '../services/DeviceAccessLogService';

class AuthController {
  // Login por senha
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { password, identificador, chaveSecreta, ip } = req.body;

      if (!password || !identificador || !chaveSecreta) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        return;
      }

      const { token, employee, device } = await AuthService.login(
        password,
        identificador,
        chaveSecreta
      );

            // Registrar log de acesso
      await DeviceAccessLogService.createLog({
        deviceId: device.id,
        ip: ip,
        userAgent: req.headers['user-agent'] || 'unknown',
      });

      res.status(200).json({
        message: 'Login realizado com sucesso.',
        token,
        employee: {
          id: employee.id,
          name: employee.name,
          role: employee.role,
        },
        device: {
          id: device.id,
          nome: device.nome,
          identificador: device.identificador,
        },
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || 'Erro interno do servidor.' });
    }
  }
}

export default new AuthController();