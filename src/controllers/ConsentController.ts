// src/controllers/ConsentController.ts
import { Request, Response } from 'express'
import { exceptionRouter } from '../utils/utilsRequest'
import ConsentRepository from '../repositories/implementations/ConsentRepository'
import { DirectorConsent } from '../entities/consent/ConsentEntity'

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

  async createDirectorConsent(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Dados recebidos para criação de consentimento de diretor:", JSON.stringify(req.body, null, 2));
      
      const consentRepository = new ConsentRepository()
      const { requestId } = req.params
      const consentData = req.body
      
      // Adicionar o campo accepted baseado no status
      const accepted = consentData.status === 'Aprovado'
      
      const directorConsentData: Partial<DirectorConsent> = {
        accepted,
        opinion: consentData.opinion || ''
      }
      
      const newDirectorConsent = await consentRepository.createDirectorConsent(directorConsentData, Number(requestId))
      console.log("✅ [Controller] Consentimento de diretor criado com sucesso:", JSON.stringify(newDirectorConsent, null, 2));
      
      res.status(201).json({ 
        message: 'Director consent created', 
        consent: newDirectorConsent,
        requestStatus: accepted ? 'Aprovado' : 'Rejeitado'
      })
    } catch (error: any) {
      console.error("❌ [Controller] Erro ao criar consentimento de diretor:", error);
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