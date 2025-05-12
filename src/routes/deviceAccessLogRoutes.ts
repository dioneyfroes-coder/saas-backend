//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\deviceAccessLogRoutes.ts
import { Router } from 'express';
import DeviceAccessLogController from '../controllers/DeviceAccessLogController';
import { validateBody } from '../middlewares/validatorBody';
import { createDeviceAccessLogSchema } from '../validators/DeviceAccessLogSchema';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/device-access-logs/{deviceId}:
 *   get:
 *     summary: Buscar logs de acesso por dispositivo
 *     tags:
 *       - Device Access Logs
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de logs de acesso do dispositivo
 */
router.get('/:deviceId', authMiddleware, DeviceAccessLogController.getLogsByDeviceId);

/**
 * @swagger
 * /api/device-access-logs:
 *   post:
 *     summary: Criar um novo log de acesso de dispositivo
 *     tags:
 *       - Device Access Logs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: integer
 *                 example: 1
 *               ip:
 *                 type: string
 *                 example: "192.168.1.100"
 *               userAgent:
 *                 type: string
 *                 example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
 *     responses:
 *       201:
 *         description: Log de acesso criado com sucesso
 */
router.post('/', validateBody(createDeviceAccessLogSchema), DeviceAccessLogController.createLog);

export default router;