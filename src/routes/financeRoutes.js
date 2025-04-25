import { Router } from 'express';
import FinanceController from '../controllers/FinanceController.js';

const router = Router();

router.post('/', FinanceController.create);
router.get('/', FinanceController.getAll);
router.get('/:id', FinanceController.getById);
router.put('/:id', FinanceController.update);
router.delete('/:id', FinanceController.delete);
router.get('/summary/category', FinanceController.getSummaryByCategory);
router.get('/balance', FinanceController.getTotalBalance);
router.get('/period', FinanceController.getByPeriod);

export default router;