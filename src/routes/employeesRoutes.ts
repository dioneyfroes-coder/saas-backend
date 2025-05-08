/* filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes\employeesRoutes.ts */
import { RequestHandler, Router } from 'express';
import EmployeesController from '../controllers/EmployeesController';
import { validateBody } from '../middlewares/validatorBody';
import { createEmployeeSchema, updateEmployeeSchema } from '../validators/EmployeeSchema';

const router = Router();

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Listar todos os funcionários
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: Lista de todos os funcionários
 *   post:
 *     summary: Criar um novo funcionário
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               phone:
 *                 type: string
 *                 example: "51999999999"
 *               address:
 *                 type: string
 *                 example: "Rua Exemplo, 123"
 *               passwordHash:
 *                 type: string
 *                 example: "hash_da_senha"
 *               role:
 *                 type: string
 *                 example: "super_admin"
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 */
router.post('/', validateBody(createEmployeeSchema), EmployeesController.create as unknown as RequestHandler);
router.get('/', EmployeesController.list as unknown as RequestHandler);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Obter um funcionário por ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do funcionário correspondente
 *   put:
 *     summary: Atualizar dados de um funcionário
 *     tags:
 *       - Employees
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
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *   delete:
 *     summary: Excluir um funcionário
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Funcionário excluído com sucesso
 */
router.get('/:id', EmployeesController.getById as unknown as RequestHandler);
router.put('/:id', validateBody(createEmployeeSchema), EmployeesController.update as unknown as RequestHandler);
router.delete('/:id', EmployeesController.remove as unknown as RequestHandler);

export default router;