// routes/inventoryRoutes.js
import { Router } from 'express';
import InventoryController from '../controllers/InventoryController.js';

const router = Router();

router.get('/inventory/:productId', InventoryController.getStock);
router.post('/inventory/add', InventoryController.addStock);
router.post('/inventory/remove', InventoryController.removeStock);
router.get('/inventory/movements/:inventoryId', InventoryController.getMovements);

export default router;
