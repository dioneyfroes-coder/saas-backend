import { Router } from 'express';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';
import productRoutes from './productRoutes';
import userRoutes from './userRoutes';
import deviceRoutes from './deviceRoutes';
import deviceAccessLogRoutes from './deviceAccessLogRoutes';
import inventoryRoutes from './inventoryRoutes';
import saleRoutes from './saleRoutes';
import financeRoutes from './financeRoutes';
import customerRoutes from './customerRoutes';
import tenantRoutes from './tenantRoutes'; // ✅ Nova rota para o módulo de tenants
import inventoryMovementsRoutes from './inventoryMovimentsRoutes';
import saleItemRoutes from './saleItemRoutes';

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
