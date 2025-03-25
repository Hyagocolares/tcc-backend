// src/routes/statusRequestRoutes.ts
import { Router } from 'express'
import StatusRequestController from '../controllers/StatusRequestController'
import { authenticate } from '../middlewares/authMiddleware'

const statusRequestRoutes = Router()

statusRequestRoutes.use(authenticate)

statusRequestRoutes.post('/', StatusRequestController.createStatusRequest)
statusRequestRoutes.get('/', StatusRequestController.getAllStatusRequests)
statusRequestRoutes.get('/:id', StatusRequestController.getStatusRequestById)
statusRequestRoutes.put('/:id', StatusRequestController.updateStatusRequest)
statusRequestRoutes.delete('/:id', StatusRequestController.deleteStatusRequest)

export default statusRequestRoutes
