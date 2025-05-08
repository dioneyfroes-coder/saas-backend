//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\financeRoutes.ts
import { Router } from 'express';
import FinanceController from '../controllers/FinanceController';
import { validateBody } from '../middlewares/validatorBody';
import { createFinanceSchema, updateFinanceSchema } from '../validators/FinanceSchema';

const router = Router();

/**
 * @swagger
 * /api/finance:
 *   post:
 *     summary: Criar um novo registro financeiro
 *     tags:
 *       - Finance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Venda de produtos"
 *               type:
 *                 type: string
 *                 example: "income"
 *               value:
 *                 type: number
 *                 format: float
 *                 example: 250.75
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-08"
 *               category:
 *                 type: string
 *                 example: "sales"
 *               note:
 *                 type: string
 *                 example: "Observação adicional"
 *     responses:
 *       201:
 *         description: Registro criado com sucesso
 *   get:
 *     summary: Listar todos os registros financeiros
 *     tags:
 *       - Finance
 *     responses:
 *       200:
 *         description: Lista de todos os registros financeiros
 */
router.post('/', validateBody(createFinanceSchema), FinanceController.create);
router.get('/', FinanceController.getAll);

/**
 * @swagger
 * /api/finance/{id}:
 *   get:
 *     summary: Buscar um registro financeiro pelo ID
 *     tags:
 *       - Finance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna o registro encontrado
 *   put:
 *     summary: Atualizar um registro financeiro
 *     tags:
 *       - Finance
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               value:
 *                 type: number
 *                 format: float
 *               date:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro atualizado com sucesso
 *   delete:
 *     summary: Excluir um registro financeiro
 *     tags:
 *       - Finance
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Registro excluído com sucesso
 */
router.get('/:id', FinanceController.getById);
router.put('/:id', validateBody(updateFinanceSchema), FinanceController.update);
router.delete('/:id', FinanceController.delete);

/**
 * @swagger
 * /api/finance/summary/category:
 *   get:
 *     summary: Obter sumário de registros por categoria
 *     tags:
 *       - Finance
 *     responses:
 *       200:
 *         description: Sumário agregado por categoria
 */
router.get('/summary/category', FinanceController.getSummaryByCategory);

/**
 * @swagger
 * /api/finance/balance:
 *   get:
 *     summary: Obter saldo total (entradas - saídas)
 *     tags:
 *       - Finance
 *     responses:
 *       200:
 *         description: Saldo total
 */
router.get('/balance', FinanceController.getTotalBalance);

/**
 * @swagger
 * /api/finance/period:
 *   get:
 *     summary: Listar registros em um período
 *     tags:
 *       - Finance
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data inicial do período
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data final do período
 *     responses:
 *       200:
 *         description: Registros dentro do período especificado
 */
router.get('/period', FinanceController.getByPeriod);

export default router;