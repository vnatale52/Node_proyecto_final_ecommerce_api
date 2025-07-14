// src/routes/products.routes.js

import { Router } from 'express';
// Reemplazamos ../  por  #   (ruta relativa por absoluta)

import productController from '#controllers/product.controller.js';

// Importamos middleware
import authMiddleware from '#middlewares/auth.middleware.js';

const router = Router();

// --- RUTAS PÚBLICAS (No requieren token) ---
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// --- RUTAS PROTEGIDAS (Requieren token válido) ---
// Añadimos 'authMiddleware' como segundo argumento. Express lo ejecutará
// antes de pasar la petición al controlador. Si el middleware falla,
// nunca llegará a 'productController'.
router.post('/', authMiddleware, productController.createProduct);
router.patch('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

export default router;

