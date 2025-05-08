//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\StockRoutes.ts
import { Router } from 'express';
import StockController from '../controllers/StockController';
import { validateBody } from '../middlewares/validatorBody';
import { createStockSchema, updateStockSchema } from '../validators/StockSchema';

const router = Router();

/**
 * @swagger
 * /api/stock:
 *   get:
 *     summary: Buscar todos os itens no estoque
 *     tags:
 *       - Stock
 *     responses:
 *       200:
 *         description: Lista de itens do estoque
 */
router.get('/', StockController.getAll);

/**
 * @swagger
 * /api/stock/{id}:
 *   get:
 *     summary: Buscar um item por ID
 *     tags:
 *       - Stock
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna o item correspondente
 */
router.get('/:id', StockController.getById);

/**
 * @swagger
 * /api/stock/barcode/{barcode}:
 *   get:
 *     summary: Buscar um item por código de barras
 *     tags:
 *       - Stock
 *     parameters:
 *       - in: path
 *         name: barcode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna o item correspondente
 */
router.get('/barcode/:barcode', StockController.getByBarcode);

/**
 * @swagger
 * /api/stock:
 *   post:
 *     summary: Criar um novo item no estoque
 *     tags:
 *       - Stock
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Coca-Cola Pet 2L"
 *               barcode:
 *                 type: string
 *                 example: "7891234567890"
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 6.99
 *               description:
 *                 type: string
 *                 example: "Bebida gaseificada"
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 */
router.post('/', validateBody(createStockSchema), StockController.create);

/**
 * @swagger
 * /api/stock/{id}:
 *   put:
 *     summary: Atualizar um item do estoque
 *     tags:
 *       - Stock
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
 *               name:
 *                 type: string
 *                 example: "Coca-Cola Pet 2L"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 7.50
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 */
router.put('/:id', validateBody(updateStockSchema), StockController.update);

/**
 * @swagger
 * /api/stock/{id}:
 *   delete:
 *     summary: Excluir um item do estoque
 *     tags:
 *       - Stock
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item excluído com sucesso
 */
router.delete('/:id', StockController.delete);

export default router;