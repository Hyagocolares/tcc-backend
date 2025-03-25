// src/routes/password.routes.ts
import { Router } from 'express';
import PasswordController from '../controllers/PasswordController';
import { authenticate } from '../middlewares/authMiddleware';

const passwordRoutes = Router();

passwordRoutes.use(authenticate)

passwordRoutes.post('/password-reset', PasswordController.requestPasswordReset);
passwordRoutes.post('/', PasswordController.resetPassword);

export default passwordRoutes;
