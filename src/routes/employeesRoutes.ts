import { RequestHandler, Router } from 'express';
import EmployeesController from '../controllers/EmployeesController';

const router = Router();

router.post('/', EmployeesController.create as unknown as RequestHandler);
router.get('/', EmployeesController.list as unknown as RequestHandler);
router.get('/:id', EmployeesController.getById as unknown as RequestHandler);
router.put('/:id', EmployeesController.update as unknown as RequestHandler);
router.delete('/:id', EmployeesController.remove as unknown as RequestHandler);

export default router;