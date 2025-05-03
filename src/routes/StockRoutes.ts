//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\StockRoutes.ts
import { Router } from 'express';
import StockController from '../controllers/StockController';
import { validateBody } from '../middlewares/validatorBody';
import { createStockSchema, updateStockSchema } from '../validators/StockSchema';

const router = Router();

router.get('/', StockController.getAll);
router.get('/:id', StockController.getById);
router.get('/barcode/:barcode', StockController.getByBarcode);

// Aplicando a validação de criação
router.post('/', validateBody(createStockSchema), StockController.create);

// Aplicando a validação de atualização
router.put('/:id', validateBody(updateStockSchema), StockController.update);

router.delete('/:id', StockController.delete);

export default router;