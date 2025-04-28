import { Router } from 'express';
import SaleController from '../controllers/SaleController';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';

const router = Router();

// Middleware para adicionar tenantId
router.use(tenantMiddleware);

// Rotas de vendas
router.post('/', SaleController.createSale);
router.get('/', SaleController.getAllSales);
router.get('/:id', SaleController.getSaleById);
router.post('/:id/cancel', SaleController.cancelSale);

export default router;