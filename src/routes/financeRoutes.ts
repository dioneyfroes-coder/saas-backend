//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\financeRoutes.ts
import { Router } from 'express';
import FinanceController from '../controllers/FinanceController';
import { validateBody } from '../middlewares/validatorBody';
import { createFinanceSchema, updateFinanceSchema } from '../validators/FinanceSchema';

const router = Router();

// Rotas de registros financeiros

// POST: criar novo registro (validação do corpo)
router.post('/', validateBody(createFinanceSchema), FinanceController.create);

// PUT: atualizar registro (validação do corpo)
router.put('/:id', validateBody(updateFinanceSchema), FinanceController.update);

// Demais rotas que não exigem validação do corpo
router.get('/', FinanceController.getAll);
router.get('/:id', FinanceController.getById);
router.delete('/:id', FinanceController.delete);

// Rotas adicionais
router.get('/summary/category', FinanceController.getSummaryByCategory);
router.get('/balance', FinanceController.getTotalBalance);
router.get('/period', FinanceController.getByPeriod);

export default router;