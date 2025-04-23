// routes/financeRoutes.js
import { Router } from 'express';
import FinanceController from '../controllers/FinanceController.js';
import financePermissionMiddleware from '../middlewares/financePermissionMiddleware.js';

const router = Router();

// Rotas protegidas por permissões
router.post('/', financePermissionMiddleware, FinanceController.create);
router.put('/:id', financePermissionMiddleware, FinanceController.update);
router.delete('/:id', financePermissionMiddleware, FinanceController.delete);

// Rotas públicas (apenas leitura)
router.get('/', FinanceController.getAll);
router.get('/:id', FinanceController.getById);

export default router;