//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\saleRoutes.ts
import { Router } from 'express';
import SaleController from '../controllers/SaleController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateBody } from '../middlewares/validatorBody';
import { createSaleSchema } from '../validators/SaleSchema';

const router = Router();

// Rotas de vendas protegidas por token
router.use(authMiddleware);

// POST: criar nova venda (validação do corpo)
router.post('/', validateBody(createSaleSchema), SaleController.createSale);

// Demais rotas
router.get('/', SaleController.getAllSales);
router.get('/:id', SaleController.getSaleById);

// Cancelar venda
router.post('/:id/cancel', SaleController.cancelSale);

export default router;