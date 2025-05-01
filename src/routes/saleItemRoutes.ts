import { Router } from 'express';
import SaleItemController from '../controllers/SaleItemController';

const router = Router();

// Rotas de itens de venda
router.get('/:saleId', SaleItemController.getItemsBySale);
router.post('/', SaleItemController.createSaleItem);
router.delete('/:saleId', SaleItemController.deleteItemsBySale);

export default router;