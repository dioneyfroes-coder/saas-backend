import { Router } from 'express';
import InventoryMovementController from '../controllers/InventoryMovementController';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';

const router = Router();

// Middleware para adicionar tenantId
router.use(tenantMiddleware);

// Rotas de movimentos de inventário
router.get('/:inventoryId', InventoryMovementController.getMovementsByInventory);
router.post('/', InventoryMovementController.createMovement);

export default router;