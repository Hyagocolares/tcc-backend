// src/routes/user.routes.ts
import { Router } from 'express'
import UserController from '../controllers/UserController'
import { authenticate } from '../middlewares/authMiddleware'

const userRoutes = Router()

userRoutes.use(authenticate)

userRoutes.get('/teachers', UserController.getTeachers);
userRoutes.get('/coordinator', UserController.getCoordinator);
userRoutes.get('/search', UserController.searchUsers);

userRoutes.post('/', UserController.createUser)
userRoutes.get('/', UserController.getAllUsers)
userRoutes.get('/:id', UserController.getUserById)
userRoutes.put('/:id', UserController.updateUser)
userRoutes.delete('/:id', UserController.deleteUser)
userRoutes.get('/', UserController.searchUsers)

export default userRoutes
