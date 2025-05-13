import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/auth';
import AuthRepository from '../repositories/AuthRepository';
import { TokenPayload } from '../types/AuthTypes';
import { AppError } from '../errors/AppError';
import { ROLE_PREFIX_MAP } from '../utils/ROLE_PREFIX_MAP';
import { RoleType } from '../types/RoleType';
import { generateToken } from '../utils/tokenUtil';

export class AuthService {
  // Validar login por senha
  static async login(password: string, identificador: string, chaveSecreta: string) {
    // Descriptografar os 2 primeiros dígitos da senha para identificar a role
    const rolePrefix = password.substring(0, 2);

    // Mapear o prefixo para a role correspondente
    const role: RoleType | undefined = Object.keys(ROLE_PREFIX_MAP).find(
      (key) => ROLE_PREFIX_MAP[key as keyof typeof ROLE_PREFIX_MAP] === rolePrefix
    ) as RoleType | undefined;

    if (!role) {
      throw new AppError('Role inválida.', 401);
    }

    // Buscar todos os funcionários com a role correspondente
    const employees = await AuthRepository.findEmployeesByRole(role);
    if (!employees || employees.length === 0) {
      throw new AppError('Nenhum funcionário encontrado para a role especificada.', 404);
    }

    // Validar a senha para cada funcionário encontrado
    let validEmployee = null;
    for (const employee of employees) {
      const isPasswordValid = await bcrypt.compare(password, employee.passwordHash || '');
      if (isPasswordValid) {
        validEmployee = employee;
        break;
      }
    }

    if (!validEmployee) {
      throw new AppError('Senha inválida.', 401);
    }

    // Validar o dispositivo
    const device = await AuthRepository.findDeviceByIdentificador(identificador);
    if (!device || device.chaveSecreta !== chaveSecreta) {
      throw new AppError('Dispositivo não autorizado.', 401);
    }

    // Gerar token JWT
    const tokenPayload: TokenPayload = {
      employeesId: validEmployee.id,
      deviceId: device.id,
      role: validEmployee.role,
    };

    const token = generateToken(tokenPayload);

    return { token, employee: validEmployee, device };
  }
}