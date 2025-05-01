//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\financeRoutes.ts
import { Router } from 'express';
import FinanceController from '../controllers/FinanceController';
// import { tenantMiddleware } from '../middlewares/tenantMiddleware';

const router = Router();

// Caso não haja mais tenant, remova este middleware completamente
// router.use(tenantMiddleware);

// Rotas de registros financeiros
router.post('/', FinanceController.create);
router.get('/', FinanceController.getAll);
router.get('/:id', FinanceController.getById);
router.put('/:id', FinanceController.update);
router.delete('/:id', FinanceController.delete);

// Rotas adicionais
router.get('/summary/category', FinanceController.getSummaryByCategory);
router.get('/balance', FinanceController.getTotalBalance);
router.get('/period', FinanceController.getByPeriod);

export default router;