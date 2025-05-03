//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\deviceAccessLogRoutes.ts
import { Router } from 'express';
import DeviceAccessLogController from '../controllers/DeviceAccessLogController';
import { validateBody } from '../middlewares/validatorBody';
import { createDeviceAccessLogSchema } from '../validators/DeviceAccessLogSchema';

const router = Router();

// Buscar logs de acesso por dispositivo
router.get('/:deviceId', DeviceAccessLogController.getLogsByDeviceId);

// Criar um novo log de acesso (validação via createDeviceAccessLogSchema)
router.post('/', validateBody(createDeviceAccessLogSchema), DeviceAccessLogController.createLog);

export default router;