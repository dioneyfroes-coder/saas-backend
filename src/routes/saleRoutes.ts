import { Router } from 'express';
import SaleController from '../controllers/SaleController';
import { employeeMiddleware } from '../middlewares/employeeMiddleware';

const router = Router();

// Middleware para adicionar employeesId
router.use(employeeMiddleware);

// Rotas de vendas
router.post('/', SaleController.createSale);
router.get('/', SaleController.getAllSales);
router.get('/:id', SaleController.getSaleById);
router.post('/:id/cancel', SaleController.cancelSale);

export default router;