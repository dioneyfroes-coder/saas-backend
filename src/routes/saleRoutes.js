import { Router } from 'express';
import SaleController from '../controllers/SaleController.js';
import tenantMiddleware from '../middlewares/tenantMiddleware.js';

const router = Router();

router.use(tenantMiddleware);

router.post('/', SaleController.createSale);
router.get('/', SaleController.getAllSales);
router.get('/:id', SaleController.getSaleById);
router.post('/:id/cancel', SaleController.cancelSale);

export default router;