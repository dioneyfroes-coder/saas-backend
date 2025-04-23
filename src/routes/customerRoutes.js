import { Router } from 'express';
import * as customerController from '../controllers/CustomerController.js';

const router = Router();

router.post('/', customerController.create);
router.get('/', customerController.list);
router.get('/:id', customerController.getById);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.remove);

export default router;
