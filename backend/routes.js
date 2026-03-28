import expree from 'express';
import { login, register } from './controllers/authController.js';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from './controllers/productController.js';
import { addToCart, clearCart, getCartById, removeFromCart, updateCartItem } from './controllers/cartController.js';
import { get } from 'node:http';
import { addAddress, deleteAddress, getAddresses, updateAddress } from './controllers/addressController.js';
import { placeOrder } from './controllers/orderController.js';

const router = expree.Router();

router.post('/user/register', register);
router.post('/user/login', login);
router.post('/user/product', createProduct);
router.get('/user/product', getProducts);
router.get('/user/product/:id', getProductById);
router.put('/user/product/:id', updateProduct);
router.delete('/user/product/:id', deleteProduct);
router.get('/user/cart/:userId', getCartById);
router.post('/user/cart', addToCart);
router.put('/user/cart', updateCartItem);
router.delete('/user/cart', removeFromCart);
router.delete('/user/cart/:userId', clearCart);
router.get('/user/address/:userId', getAddresses);
router.post('/user/address', addAddress);
router.put('/user/address/:id', updateAddress);
router.delete('/user/address/:id', deleteAddress);
router.post('/user/order', placeOrder);


export default router;