import UserRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';

class UserService {
  async getAllUsers(tenantId) {
    return await UserRepository.findAll(tenantId);
  }

  async getUserById(id, tenantId) {
    return await UserRepository.findById(id, tenantId);
  }

  async createUser(data, tenantId) {
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    const userData = { ...data, senha: hashedPassword, tenantId };
    return await UserRepository.create(userData);
  }

  async updateUser(id, data, tenantId) {
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }
    return await UserRepository.update(id, data, tenantId);
  }

  async deleteUser(id, tenantId) {
    return await UserRepository.delete(id, tenantId);
  }

  async authenticate(username, senha, tenantId) {
    const user = await UserRepository.findByUsername(username, tenantId);
    if (!user || !user.ativo) return null;

    const isMatch = await bcrypt.compare(senha, user.senha);
    return isMatch ? user : null;
  }
}

export default new UserService();