// src/routes/user.routes.ts
import { Router } from 'express'
import UserController from '../controllers/UserController'
import { authenticate } from '../middlewares/authMiddleware'

const userRoutes = Router()

userRoutes.use(authenticate)

userRoutes.post('/', UserController.createUser)
userRoutes.get('/', UserController.getAllUsers)
userRoutes.get('/:id', UserController.getUserById)
userRoutes.put('/:id', UserController.updateUser)
userRoutes.delete('/:id', UserController.deleteUser)
userRoutes.get('/', UserController.searchUsers)

export default userRoutes
