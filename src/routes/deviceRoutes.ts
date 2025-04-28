import { Router } from 'express';
import DeviceController from '../controllers/DeviceController.js';
import { tenantMiddleware } from '../middlewares/tenantMiddleware.js';

const router = Router();

// Middleware para adicionar tenantId
router.use(tenantMiddleware);

// Rotas de dispositivos
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getById);
router.get('/logs/:id', DeviceController.getAccessLogs);
router.post('/', DeviceController.create);
router.put('/:id', DeviceController.update);
router.delete('/:id', DeviceController.delete);

// Autenticação de dispositivos
router.post('/authenticate', DeviceController.authenticate);

export default router;