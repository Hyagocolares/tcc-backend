// src/routes/requestRoutes.ts
import { Router } from 'express'
import RequestController from '../controllers/RequestController'
import { authenticate } from '../middlewares/authMiddleware'

const requestRoutes = Router()

requestRoutes.use(authenticate)
requestRoutes.get('/paginated', RequestController.getPaginatedRequests)

requestRoutes.get('/', RequestController.getAllRequests)
requestRoutes.post('/', RequestController.createRequest)
requestRoutes.get('/:id', RequestController.getRequestById)
requestRoutes.put('/:id', RequestController.updateRequest)
requestRoutes.delete('/:id', RequestController.deleteRequest)
requestRoutes.patch('/:id/status', RequestController.updateRequestStatus)

export default requestRoutes
