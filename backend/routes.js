import expree from 'express';
import { register } from './controllers/authController.js';

const router = expree.Router();

router.post('/user/register', register);
router.post('/user/login', login);

export default router;