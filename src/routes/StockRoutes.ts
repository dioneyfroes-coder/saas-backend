import { Router } from 'express';
import StockController from '../controllers/StockController';

const router = Router();

router.get('/', StockController.getAll);
router.get('/:id', StockController.getById);
router.get('/barcode/:barcode', StockController.getByBarcode); // Nova rota para buscar por código de barras
router.post('/', StockController.create);
router.put('/:id', StockController.update);
router.delete('/:id', StockController.delete);

export default router;