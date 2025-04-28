import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  // Buscar todos os usuários
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const users = await UserService.getAllUsers(tenantId!);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  }

  // Buscar um usuário por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const user = await UserService.getUserById(Number(req.params.id), tenantId!);
      if (user) res.json(user);
      else res.status(404).json({ message: 'Usuário não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  }

  // Criar um novo usuário
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const user = await UserService.createUser(req.body, tenantId!);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }

  // Atualizar um usuário
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const user = await UserService.updateUser(Number(req.params.id), req.body, tenantId!);
      if (user) res.json(user);
      else res.status(404).json({ message: 'Usuário não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  }

  // Excluir um usuário
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const success = await UserService.deleteUser(Number(req.params.id), tenantId!);
      if (success) res.status(204).send();
      else res.status(404).json({ message: 'Usuário não encontrado' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
  }

  // Autenticar um usuário
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { tenantId } = req;
      const { username, senha } = req.body;
      const user = await UserService.authenticate(username, senha, tenantId!);
      if (user) res.json(user);
      else res.status(401).json({ message: 'Credenciais inválidas ou usuário inativo' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao autenticar usuário' });
    }
  }
}

export default new UserController();