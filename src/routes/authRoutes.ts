// src/routes/authRoutes.ts
import { Router } from 'express'
import AuthController from '../controllers/AuthController'

const authRoutes = Router()

authRoutes.post('/register', AuthController.register)
authRoutes.post('/login', AuthController.login)
authRoutes.get('/profile', AuthController.getProfile)
authRoutes.put('/finalize-register', AuthController.finalizeRegistration)

export default authRoutes
