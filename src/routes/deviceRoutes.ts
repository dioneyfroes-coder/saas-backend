//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\deviceRoutes.ts
import { Router } from 'express';
import DeviceController from '../controllers/DeviceController';
// Importe o middleware e os schemas
import { validateBody } from '../middlewares/validatorBody';
import { createDeviceSchema, updateDeviceSchema } from '../validators/DeviceSchema';

const router = Router();

// Rotas de dispositivos
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getById);
router.get('/logs/:id', DeviceController.getAccessLogs);

// Rotas que exigem validação do corpo
router.post('/', validateBody(createDeviceSchema), DeviceController.create);
router.put('/:id', validateBody(updateDeviceSchema), DeviceController.update);

router.delete('/:id', DeviceController.delete);

// Autenticação de dispositivos
router.post('/authenticate', DeviceController.authenticate);

export default router;