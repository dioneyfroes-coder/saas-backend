//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\deviceRoutes.ts
import { Router } from 'express';
import DeviceController from '../controllers/DeviceController';

const router = Router();

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