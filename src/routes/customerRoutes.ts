import { Router } from 'express';
import CustomerController from '../controllers/CustomerController.js';

const router = Router();

// Criar um cliente
router.post('/', CustomerController.create);

// Listar todos os clientes
router.get('/', CustomerController.list);

// Buscar um cliente por ID
router.get('/:id', CustomerController.getById);

// Atualizar um cliente
router.put('/:id', CustomerController.update);

// Remover um cliente
router.delete('/:id', CustomerController.remove);

export default router;