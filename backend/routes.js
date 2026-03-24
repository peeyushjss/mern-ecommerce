import expree from 'express';
import { login, register } from './controllers/authController.js';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from './controllers/productController.js';

const router = expree.Router();

router.post('/user/register', register);
router.post('/user/login', login);
router.post('/user/product', createProduct);
router.get('/user/product', getProducts);
router.get('/user/product/:id', getProductById);
router.put('/user/product/:id', updateProduct);
router.delete('/user/product/:id', deleteProduct);

export default router;