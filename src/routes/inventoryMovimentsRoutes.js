// routes/inventoryMovimentsRoutes.js
import { Router } from 'express';
import InventoryMovementController from '../controllers/InventoryMovementController.js';

const router = Router();

router.get('/:inventoryId', InventoryMovementController.getMovementsByInventory);
router.post('/', InventoryMovementController.createMovement);

export default router;