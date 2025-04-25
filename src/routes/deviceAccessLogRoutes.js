import { Router } from 'express';
import DeviceAccessLogController from '../controllers/DeviceAccessLogController.js';

const router = Router();

// Rotas de logs de acesso de dispositivos
router.get('/:deviceId', DeviceAccessLogController.getLogsByDeviceId);
router.post('/', DeviceAccessLogController.createLog);

export default router;