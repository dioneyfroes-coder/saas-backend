import { Router } from 'express';
import SaleItemController from '../controllers/SaleItemController.js';

const router = Router();

router.get('/:saleId', SaleItemController.getItemsBySale);
router.post('/', SaleItemController.createSaleItem);
router.delete('/:saleId', SaleItemController.deleteItemsBySale);

export default router;