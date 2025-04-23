import { Router } from 'express';
import ProductController from '../controllers/Product.js';

const router = Router();

// Rotas de produtos
router.get('/', ProductController.getAll);
router.get('/id/:id', ProductController.getById);
router.get('/barcode/:codigobarras', ProductController.getByCodigoBarras);
router.post('/', ProductController.create);
router.put('/id/:id', ProductController.update);
router.put('/barcode/:codigobarras', ProductController.updateByCodigoBarras);
router.delete('/id/:id', ProductController.delete);
router.delete('/barcode/:codigobarras', ProductController.deleteByCodigoBarras);

export default router;