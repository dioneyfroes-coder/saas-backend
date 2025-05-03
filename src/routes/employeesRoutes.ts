import { RequestHandler, Router } from 'express';
import EmployeesController from '../controllers/EmployeesController';
import { validateBody } from '../middlewares/validatorBody';
import { createEmployeeSchema, updateEmployeeSchema } from '../validators/EmployeeSchema';

const router = Router();

router.post('/',validateBody(createEmployeeSchema), EmployeesController.create as unknown as RequestHandler);
router.get('/', EmployeesController.list as unknown as RequestHandler);
router.get('/:id', EmployeesController.getById as unknown as RequestHandler);
router.put('/:id',validateBody(createEmployeeSchema), EmployeesController.update as unknown as RequestHandler);
router.delete('/:id', EmployeesController.remove as unknown as RequestHandler);

export default router;