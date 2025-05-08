//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\saleRoutes.ts
import { Router } from 'express';
import SaleController from '../controllers/SaleController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateBody } from '../middlewares/validatorBody';
import { createSaleSchema } from '../validators/SaleSchema';

const router = Router();

// Rotas de vendas protegidas por token
router.use(authMiddleware);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Criar uma nova venda
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     stockId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *               employeeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Nova venda criada com sucesso
 */
router.post('/', validateBody(createSaleSchema), SaleController.createSale);

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Listar todas as vendas
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas as vendas
 */
router.get('/', SaleController.getAllSales);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Obter detalhes de uma venda pelo ID
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Detalhes da venda
 */
router.get('/:id', SaleController.getSaleById);

/**
 * @swagger
 * /api/sales/{id}/cancel:
 *   post:
 *     summary: Cancelar uma venda
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Venda cancelada com sucesso
 */
router.post('/:id/cancel', SaleController.cancelSale);

export default router;