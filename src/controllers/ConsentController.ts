// src/controllers/ConsentController.ts
import { Request, Response } from 'express'
import { exceptionRouter } from '../utils/utilsRequest'
import ConsentRepository from '../repositories/implementations/ConsentRepository'
import { DirectorConsent } from '../entities/consent/ConsentEntity'
import { Director } from '../entities/user/UserEntity'
import UserRepository from '../repositories/implementations/UserRepository'
import { IRequestId } from '../interfaces/request/IRequest'
import RequestRepository from 'src/repositories/implementations/RequestRepository'

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
      console.log("📥 [Controller] Parâmetros da URL:", JSON.stringify(req.params, null, 2));

      const consentRepository = new ConsentRepository()
      const { opinion, status, userId, accepted } = req.body
      const { requestId } = req.params

      // Validações de entrada
      if (!userId) {
        res.status(400).json({ error: 'ID do usuário (diretor) não fornecido' });
        return;
      }

      if (!requestId) {
        res.status(400).json({ error: 'ID da solicitação não fornecido' });
        return;
      }

      // Verificar se o requestId é um número válido
      const requestIdNumber = Number(requestId);
      if (isNaN(requestIdNumber)) {
        res.status(400).json({ error: 'ID da solicitação inválido' });
        return;
      }

      // Verificar se já existe um consentimento para esta solicitação
      try {
        const existingConsent = await consentRepository.getDirectorConsentByRequestId(requestIdNumber);
        if (existingConsent) {
          console.log("⚠️ [Controller] Já existe um consentimento de diretor para esta solicitação:", existingConsent.id);
          res.status(409).json({
            message: 'Já existe um consentimento de diretor para esta solicitação',
            existingConsent
          });
          return;
        }
      } catch (error) {
        console.error("❌ [Controller] Erro ao verificar consentimento existente:", error);
        // Continuar mesmo com erro na verificação
      }

      // Buscar o diretor pelo ID
      const directorRepository = new UserRepository()
      let director;
      try {
        director = await directorRepository.getUserById(Number(userId));
      } catch (error) {
        console.error("❌ [Controller] Erro ao buscar diretor:", error);
        res.status(500).json({ error: 'Erro ao buscar diretor' });
        return;
      }

      if (!director) {
        res.status(404).json({ error: 'Diretor não encontrado' });
        return;
      }

      console.log("✅ [Controller] Diretor encontrado:", JSON.stringify({
        id: director.id,
        name: director.name,
        email: director.email,
        category: director.category
      }, null, 2));

      // Adicionar o campo accepted baseado no status
      const directorConsentData: Partial<DirectorConsent> = {
        accepted: accepted !== undefined ? accepted : status === 'Aprovado',
        opinion: opinion || '',
        userDirector: director as Director,
      }

      console.log("📤 [Controller] Dados para criação do consentimento:", JSON.stringify(directorConsentData, null, 2));
      
      try {
        const newDirectorConsent = await consentRepository.createDirectorConsent(directorConsentData, requestIdNumber)
        console.log("✅ [Controller] Consentimento de diretor criado com sucesso:", JSON.stringify(newDirectorConsent, null, 2));

        res.status(201).json({
          message: 'Director consent created',
          consent: newDirectorConsent,
          requestStatus: directorConsentData.accepted ? 'Aprovado' : 'Rejeitado'
        })
      } catch (error) {
        console.error("❌ [Controller] Erro ao criar consentimento:", error);
        res.status(500).json({ error: error.message || 'Erro ao criar consentimento' });
      }
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
      res.status(200).json({ consents })
    } catch (error: any) {
      return exceptionRouter(req, res, error)
    }
  }

  async getDirectorConsentByRequestId(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Buscando consentimento de diretor para request:", req.params.requestId);

      const consentRepository = new ConsentRepository()
      const { requestId } = req.params

      if (!requestId) {
        throw new Error('ID da solicitação não fornecido');
      }

      const directorConsent = await consentRepository.getDirectorConsentByRequestId(Number(requestId))

      if (!directorConsent) {
        res.status(404).json({ message: 'Director consent not found for this request' })
        return
      }

      console.log("✅ [Controller] Consentimento de diretor encontrado:", JSON.stringify({
        id: directorConsent.id,
        requestId: directorConsent.request?.id,
        userDirectorId: directorConsent.userDirector?.id,
        accepted: directorConsent.accepted
      }, null, 2));

      res.status(200).json({ consent: directorConsent })
    } catch (error: any) {
      console.error("❌ [Controller] Erro ao buscar consentimento de diretor:", error);
      return exceptionRouter(req, res, error)
    }
  }
}

export default new ConsentController()