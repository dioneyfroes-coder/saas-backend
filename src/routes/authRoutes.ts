//// filepath: c:\Users\dioney\Documents\projeto\pdv\novo backend\src\routes/authRoutes.ts
import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login por senha
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "011234"
 *               identificador:
 *                 type: string
 *                 example: "terminal-pdv-01"
 *               chaveSecreta:
 *                 type: string
 *                 example: "chave_secreta_gerada"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 *       404:
 *         description: Funcionário ou dispositivo não encontrado
 */
router.post('/login', AuthController.login);

export default router;