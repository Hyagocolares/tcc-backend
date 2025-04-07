// src/routes/consentRoutes.ts
import { Router } from 'express'
import ConsentController from '../controllers/ConsentController'
import { authenticate } from '../middlewares/authMiddleware'

const consentRoutes = Router()

consentRoutes.use(authenticate)

consentRoutes.post('/', ConsentController.createConsent)
consentRoutes.post('/director/:requestId', ConsentController.createDirectorConsent)
consentRoutes.get('/', ConsentController.getAllConsents)
consentRoutes.get('/:id', ConsentController.getConsentById)
consentRoutes.put('/:id', ConsentController.updateConsent)
consentRoutes.delete('/:id', ConsentController.deleteConsent)

export default consentRoutes
