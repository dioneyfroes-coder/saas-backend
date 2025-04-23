import UserService from '../services/UserService.js';

class UserController {
  async getAll(req, res) {
    try {
      const { tenantId } = req;
      const users = await UserService.getAllUsers(tenantId);
      res.json(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  }

  async getById(req, res) {
    try {
      const { tenantId } = req;
      const user = await UserService.getUserById(req.params.id, tenantId);
      if (user) res.json(user);
      else res.status(404).json({ message: 'Usuário não encontrado' });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  }

  async create(req, res) {
    try {
      const { tenantId } = req;
      const user = await UserService.createUser(req.body, tenantId);
      res.status(201).json(user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }

  async update(req, res) {
    try {
      const { tenantId } = req;
      const user = await UserService.updateUser(req.params.id, req.body, tenantId);
      if (user) res.json(user);
      else res.status(404).json({ message: 'Usuário não encontrado' });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  }

  async delete(req, res) {
    try {
      const { tenantId } = req;
      const success = await UserService.deleteUser(req.params.id, tenantId);
      if (success) res.status(204).send();
      else res.status(404).json({ message: 'Usuário não encontrado' });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
  }

  async login(req, res) {
    try {
      const { tenantId } = req;
      const { username, senha } = req.body;
      const user = await UserService.authenticate(username, senha, tenantId);
      if (user) res.json(user);
      else res.status(401).json({ message: 'Credenciais inválidas ou usuário inativo' });
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      res.status(500).json({ message: 'Erro ao autenticar usuário' });
    }
  }
}

export default new UserController();