import { Router } from 'express';
import CustomerController from '../controllers/CustomerController.js';

const router = Router();

router.post('/', CustomerController.create);
router.get('/', CustomerController.list);
router.get('/:id', CustomerController.getById);
router.put('/:id', CustomerController.update);
router.delete('/:id', CustomerController.remove);

export default router;
