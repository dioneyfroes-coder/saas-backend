//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\index.ts
import { Router } from 'express';
import productRoutes from './StockRoutes';
import deviceRoutes from './deviceRoutes';
import deviceAccessLogRoutes from './deviceAccessLogRoutes';
import saleRoutes from './saleRoutes';
import saleItemRoutes from './saleItemRoutes';
import financeRoutes from './financeRoutes';
import employeesRoutes from './employeesRoutes';

const router = Router();

// Rotas para cada recurso da aplicação, importadas e acopladas abaixo
router.use('/products', productRoutes);
router.use('/devices', deviceRoutes);
router.use('/device-access-logs', deviceAccessLogRoutes);
router.use('/sales', saleRoutes);
router.use('/sale-items', saleItemRoutes);
router.use('/finance', financeRoutes);
router.use('/employees', employeesRoutes);

export default router;