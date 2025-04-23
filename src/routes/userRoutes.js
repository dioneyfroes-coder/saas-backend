import { Router } from 'express';
import UserController from '../controllers/User.js';

const router = Router();

// Rotas de usuários
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

// Rota de login
router.post('/login', UserController.login);

export default router;