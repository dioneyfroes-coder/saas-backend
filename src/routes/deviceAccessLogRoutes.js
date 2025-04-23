import { Router } from 'express';
import DeviceAccessLogController from '../controllers/DeviceAccessLog.js';

const router = Router();

// Rotas de logs de acesso de dispositivos
router.get('/:deviceId', DeviceAccessLogController.getLogsByDeviceId);

export default router;