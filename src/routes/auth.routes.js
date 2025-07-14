// src/routes/auth.routes.js

import { Router } from 'express';
// Importamos el controlador. Reemplazamos ../  por #
import authController from '#controllers/auth.controller.js';

const router = Router();

// Cuando llegue una petición POST a '/login', será manejada por authController.login.
router.post('/login', authController.login);

export default router;