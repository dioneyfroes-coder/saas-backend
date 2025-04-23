import { Router } from 'express';
import SaleController from '../controllers/SaleController.js';
import tenantMiddleware from '../middlewares/tenantMiddleware.js';

const router = Router();

router.use(tenantMiddleware);

router.post('/sales', SaleController.createSale);
router.get('/sales', SaleController.getAllSales);
router.get('/sales/:id', SaleController.getSaleById);
router.post('/sales/:id/cancel', SaleController.cancelSale);

export default router;
