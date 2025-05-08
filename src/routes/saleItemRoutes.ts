//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\saleItemRoutes.ts
import { Router } from 'express';
import SaleItemController from '../controllers/SaleItemController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateBody } from '../middlewares/validatorBody';
import { createSaleItemSchema } from '../validators/SaleItemSchema';

const router = Router();

// Rotas de venda protegidas por token
router.use(authMiddleware);

/**
 * @swagger
 * /api/sale-items/{saleId}:
 *   get:
 *     summary: Listar itens de uma venda pelo ID da venda
 *     tags:
 *       - Sale Items
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: saleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de itens da venda
 */
router.get('/:saleId', SaleItemController.getItemsBySale);

/**
 * @swagger
 * /api/sale-items:
 *   post:
 *     summary: Adicionar um novo item a uma venda
 *     tags:
 *       - Sale Items
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               saleId:
 *                 type: integer
 *                 example: 1
 *               stockId:
 *                 type: integer
 *                 example: 5
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 15.99
 *     responses:
 *       201:
 *         description: Item adicionado à venda com sucesso
 */
router.post('/', validateBody(createSaleItemSchema), SaleItemController.createSaleItem);

/**
 * @swagger
 * /api/sale-items/{saleId}:
 *   delete:
 *     summary: Excluir todos os itens de uma venda específica
 *     tags:
 *       - Sale Items
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: saleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Itens excluídos com sucesso
 */
router.delete('/:saleId', SaleItemController.deleteItemsBySale);

export default router;