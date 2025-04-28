import UserRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';
import { UserType } from '../types/UserType.js';

class UserService {
  // Buscar todos os usuários de um tenant
  async getAllUsers(tenantId: number): Promise<UserType[]> {
    return await UserRepository.findAll(tenantId);
  }

  // Buscar um usuário por ID
  async getUserById(id: number, tenantId: number): Promise<UserType | null> {
    return await UserRepository.findById(id, tenantId);
  }

  // Criar um novo usuário
  async createUser(data: Omit<UserType, 'id' | 'createdAt' | 'updatedAt'>, tenantId: number): Promise<UserType> {
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    const userData = { ...data, senha: hashedPassword, tenantId };
    return await UserRepository.create(userData);
  }

  // Atualizar um usuário
  async updateUser(
    id: number,
    data: Partial<Omit<UserType, 'id' | 'createdAt' | 'updatedAt'>>,
    tenantId: number
  ): Promise<UserType | null> {
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }
    return await UserRepository.update(id, tenantId, data);
  }

  // Excluir um usuário
  async deleteUser(id: number, tenantId: number): Promise<boolean> {
    return await UserRepository.delete(id, tenantId);
  }

  // Autenticar um usuário
  async authenticate(username: string, senha: string, tenantId: number): Promise<UserType | null> {
    const user = await UserRepository.findByUsername(username, tenantId);
    if (!user || !user.ativo) return null;

    const isMatch = await bcrypt.compare(senha, user.senha);
    return isMatch ? user : null;
  }
}

export default new UserService();