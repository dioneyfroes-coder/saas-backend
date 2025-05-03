//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\saleItemRoutes.ts
import { Router } from 'express';
import SaleItemController from '../controllers/SaleItemController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateBody } from '../middlewares/validatorBody';
import { createSaleItemSchema } from '../validators/SaleItemSchema';

const router = Router();

// Rotas de venda protegidas por token
router.use(authMiddleware);

// Rotas de itens de venda
router.get('/:saleId', SaleItemController.getItemsBySale);
router.post('/', validateBody(createSaleItemSchema), SaleItemController.createSaleItem);
router.delete('/:saleId', SaleItemController.deleteItemsBySale);

export default router;