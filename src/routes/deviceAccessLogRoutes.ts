import { Router } from 'express';
import DeviceAccessLogController from '../controllers/DeviceAccessLogController.js';
import { tenantMiddleware } from '../middlewares/tenantMiddleware.js';

const router = Router();

// Middleware para adicionar tenantId
router.use(tenantMiddleware);

// Buscar logs de acesso por dispositivo
router.get('/:deviceId', DeviceAccessLogController.getLogsByDeviceId);

// Criar um novo log de acesso
router.post('/', DeviceAccessLogController.createLog);

export default router;