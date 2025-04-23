import UserRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';

class UserService {
  async getAllUsers() {
    return await UserRepository.findAll();
  }

  async getUserById(id) {
    return await UserRepository.findById(id);
  }

  async createUser(data) {
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    const userData = { ...data, senha: hashedPassword };
    return await UserRepository.create(userData);
  }

  async updateUser(id, data) {
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }
    return await UserRepository.update(id, data);
  }

  async deleteUser(id) {
    return await UserRepository.delete(id);
  }

  async authenticate(username, senha) {
    const user = await UserRepository.findByUsername(username);
    if (!user || !user.ativo) return null;

    const isMatch = await bcrypt.compare(senha, user.senha);
    return isMatch ? user : null;
  }
}

export default new UserService();
