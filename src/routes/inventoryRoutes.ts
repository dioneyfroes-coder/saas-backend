import { Router } from 'express';
import InventoryController from '../controllers/InventoryController';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';

const router = Router();

// Middleware para adicionar tenantId
router.use(tenantMiddleware);

// Rotas de inventário
router.get('/:productId', InventoryController.getStock);
router.post('/add', InventoryController.addStock);
router.post('/remove', InventoryController.removeStock);
router.get('/movements/:inventoryId', InventoryController.getMovements);

export default router;