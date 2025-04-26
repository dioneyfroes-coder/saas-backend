import { Router } from 'express';
import tenantMiddleware from '../middlewares/tenantMiddleware.js';
import productRoutes from './productRoutes.js';
import userRoutes from './userRoutes.js';
import deviceRoutes from './deviceRoutes.js';
import deviceAccessLogRoutes from './deviceAccessLogRoutes.js';
import inventoryRoutes from './inventoryRoutes.js';
import saleRoutes from './saleRoutes.js';
import financeRoutes from './financeRoutes.js';
import customerRoutes from './customerRoutes.js';
import tenantRoutes from './tenantRoutes.js'; // ✅ Nova rota para o módulo de tenants
import inventoryMovementsRoutes from './inventoryMovimentsRoutes.js';
import saleItemRoutes from './saleItemRoutes.js';

const router = Router();

// Middleware global para tenant
router.use(tenantMiddleware);

// Rotas organizadas por recurso
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/devices', deviceRoutes);
router.use('/device-access-logs', deviceAccessLogRoutes);
router.use('/inventory', inventoryRoutes); // ✅ Nova rota
router.use('/inventory-movements', inventoryMovementsRoutes);
router.use('/sales', saleRoutes); // ✅ Integração da rota de vendas
router.use('/sale-items', saleItemRoutes); // ✅ Integração da rota de itens de venda
router.use('/finance', financeRoutes); // ✅ Nova rota para o módulo financeiro
router.use('/customers', customerRoutes);
router.use("/tenants", tenantRoutes);

export default router;
