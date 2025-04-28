import { Router } from 'express';
import SaleItemController from '../controllers/SaleItemController';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';

const router = Router();

// Middleware para adicionar tenantId
router.use(tenantMiddleware);

// Rotas de itens de venda
router.get('/:saleId', SaleItemController.getItemsBySale);
router.post('/', SaleItemController.createSaleItem);
router.delete('/:saleId', SaleItemController.deleteItemsBySale);

export default router;