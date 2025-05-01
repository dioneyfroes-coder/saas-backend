//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\deviceAccessLogRoutes.ts
import { Router } from 'express';
import DeviceAccessLogController from '../controllers/DeviceAccessLogController';

const router = Router();

// Buscar logs de acesso por dispositivo
router.get('/:deviceId', DeviceAccessLogController.getLogsByDeviceId);

// Criar um novo log de acesso
router.post('/', DeviceAccessLogController.createLog);

export default router;