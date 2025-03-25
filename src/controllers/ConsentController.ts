// src/controllers/ConsentController.ts
import { Request, Response } from 'express'
import { exceptionRouter } from '../utils/utilsRequest'
import ConsentRepository from '../repositories/implementations/ConsentRepository'

class ConsentController {
  async createConsent(req: Request, res: Response): Promise<void> {
    try {
      const consentRepository = new ConsentRepository()
      const consentData = req.body
      const newConsent = await consentRepository.createConsent(consentData)
      res.status(201).json({ message: 'Consent created', consent: newConsent })
    } catch (error: any) {
      return exceptionRouter(req, res, error)
    }
  }

  async getAllConsents(req: Request, res: Response): Promise<void> {
    try {
      const consentRepository = new ConsentRepository()
      const consents = await consentRepository.getAllConsents()
      res.status(200).json({ consents })
    } catch (error: any) {
      return exceptionRouter(req, res, error)
    }
  }

  async getConsentById(req: Request, res: Response): Promise<void> {
    try {
      const consentRepository = new ConsentRepository()
      const { id } = req.params
      const consent = await consentRepository.getConsentById(Number(id))
      if (!consent) {
        res.status(404).json({ message: 'Consent not found' })
        return
      }
      res.status(200).json({ consent })
    } catch (error: any) {
      return exceptionRouter(req, res, error)
    }
  }

  async updateConsent(req: Request, res: Response): Promise<void> {
    try {
      const consentRepository = new ConsentRepository()
      const { id } = req.params
      const consentData = req.body
      const updatedConsent = await consentRepository.updateConsent(Number(id), consentData)
      res.status(200).json({ message: 'Consent updated', consent: updatedConsent })
    } catch (error: any) {
      return exceptionRouter(req, res, error)
    }
  }

  async deleteConsent(req: Request, res: Response): Promise<void> {
    try {
      const consentRepository = new ConsentRepository()
      const { id } = req.params
      await consentRepository.deleteConsent(Number(id))
      res.status(200).json({ message: 'Consent deleted' })
    } catch (error: any) {
      return exceptionRouter(req, res, error)
    }
  }

  async searchConsents(req: Request, res: Response): Promise<void> {
    try {
      const consentRepository = new ConsentRepository()
      const consents = await consentRepository.searchConsents(req.body)
      res.status(200).json(consents)
    } catch (error) {
      return exceptionRouter(req, res, error)
    }
  }
}

export default new ConsentController()