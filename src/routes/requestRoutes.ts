// src/routes/requestRoutes.ts
import { Router } from 'express'
import RequestController from '../controllers/RequestController'
import { authenticate } from '../middlewares/authMiddleware'

const requestRoutes = Router()

requestRoutes.use(authenticate)
requestRoutes.get('/paginated', RequestController.getPaginatedRequests) //todos
requestRoutes.get('/paginated/:id', RequestController.getPaginatedRequestsByMe)
requestRoutes.get('/:id', RequestController.getRequestById)

requestRoutes.get('/', RequestController.getAllRequests)
requestRoutes.get('/status/:status', RequestController.getRequestsByStatus)
requestRoutes.post('/', RequestController.createRequest)
requestRoutes.put('/:id', RequestController.updateRequest)
requestRoutes.delete('/:id', RequestController.deleteRequest)
requestRoutes.patch('/:id/status', RequestController.updateRequestStatus)

export default requestRoutes
