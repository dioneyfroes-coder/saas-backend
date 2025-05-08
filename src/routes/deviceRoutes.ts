//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\deviceRoutes.ts
import { Router } from 'express';
import DeviceController from '../controllers/DeviceController';
import { validateBody } from '../middlewares/validatorBody';
import { createDeviceSchema, updateDeviceSchema } from '../validators/DeviceSchema';

const router = Router();

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Listar todos os dispositivos
 *     tags:
 *       - Devices
 *     responses:
 *       200:
 *         description: Lista de todos os dispositivos cadastrados
 *   post:
 *     summary: Criar um novo dispositivo
 *     tags:
 *       - Devices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Terminal PDV"
 *               tipo:
 *                 type: string
 *                 example: "pdv"
 *               identificador:
 *                 type: string
 *                 example: "terminal-pdv-01"
 *               chaveSecreta:
 *                 type: string
 *                 example: "chave_secreta_gerada"
 *               ativo:
 *                 type: boolean
 *                 example: true
 *               employeesId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Dispositivo criado com sucesso
 */
router.get('/', DeviceController.getAll);
router.post('/', validateBody(createDeviceSchema), DeviceController.create);

/**
 * @swagger
 * /api/devices/{id}:
 *   get:
 *     summary: Buscar um dispositivo pelo ID
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dispositivo encontrado
 *   put:
 *     summary: Atualizar informações de um dispositivo
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Terminal PDV"
 *               tipo:
 *                 type: string
 *                 example: "pdv"
 *               identificador:
 *                 type: string
 *                 example: "terminal-pdv-01"
 *               ativo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Dispositivo atualizado com sucesso
 *   delete:
 *     summary: Excluir um dispositivo
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Dispositivo excluído com sucesso
 */
router.get('/:id', DeviceController.getById);
router.put('/:id', validateBody(updateDeviceSchema), DeviceController.update);
router.delete('/:id', DeviceController.delete);

/**
 * @swagger
 * /api/devices/logs/{id}:
 *   get:
 *     summary: Listar logs de acesso de um dispositivo
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de logs de acesso relacionados ao dispositivo
 */
router.get('/logs/:id', DeviceController.getAccessLogs);

/**
 * @swagger
 * /api/devices/authenticate:
 *   post:
 *     summary: Autenticar um dispositivo
 *     tags:
 *       - Devices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identificador:
 *                 type: string
 *                 example: "terminal-pdv-01"
 *               chaveSecreta:
 *                 type: string
 *                 example: "chave_secreta_gerada"
 *     responses:
 *       200:
 *         description: Dispositivo autenticado com sucesso
 */
router.post('/authenticate', DeviceController.authenticate);

export default router;