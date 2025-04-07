// src/controllers/RequestController.ts
import { Request, Response } from 'express'
import { exceptionRouter } from '../utils/utilsRequest'
import RequestRepository from '../repositories/implementations/RequestRepository'
import { RequestStatusEnum } from '../entities/enums/RequestStatusEnum'
import { formatRequest } from '../utils/formatRequest';
import { Request as RequestEntity } from '../entities/request/RequestEntity';
import { sendRequestTeacherEmail } from '../services/emailService'
import TeacherConsentDiscipline from 'src/entities/request/TeacherConsentDisciplineEntity';

class RequestController {
  async createRequest(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Dados recebidos para criação:", JSON.stringify(req.body, null, 2));
      const requestRepository = new RequestRepository()
      const requestData = req.body

      const newRequest: RequestEntity = await requestRepository.createRequest(requestData)
      console.log("✅ [Controller] Request criado com sucesso:", JSON.stringify(newRequest, null, 2));

      // const emailTeachers: TeacherConsentDiscipline[] = newRequest.consent
      // for (const emailTeacher of emailTeachers) {
      //   let email = emailTeacher.teacher.email
      //   await sendRequestTeacherEmail(email, newRequest);
      // }

      res.status(201).json({ message: 'Request created', request: newRequest })
    } catch (error) {
      console.error("❌ [Controller] Erro ao criar Request:", error);
      return exceptionRouter(req, res, error)
    }
  }

  async getAllRequests(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Solicitando todas as Requests");
      const requestRepository = new RequestRepository()
      const requests = await requestRepository.getAllRequests()
      console.log("✅ [Controller] Requests retornadas:", JSON.stringify(requests, null, 2));
      res.status(200).json({ requests })
    } catch (error) {
      console.error("❌ [Controller] Erro ao buscar todas as Requests:", error);
      return exceptionRouter(req, res, error)
    }
  }

  async getRequestById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      console.log(`📥 [Controller] Solicitando Request com ID: ${id}`);
      const requestRepository = new RequestRepository()
      const requestData = await requestRepository.getRequestById(Number(id))
      if (!requestData) {
        console.warn(`⚠️ [Controller] Request com ID ${id} não encontrada.`);
        res.status(404).json({ message: 'Request not found' });
        return;
      }
      console.log("✅ [Controller] Request encontrada:", JSON.stringify(requestData, null, 2));
      res.status(200).json({ request: requestData })
    } catch (error) {
      console.error(`❌ [Controller] Erro ao buscar Request com ID ${req.params.id}:`, error);
      return exceptionRouter(req, res, error)
    }
  }

  async updateRequest(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Dados recebidos para atualização:", JSON.stringify(req.body, null, 2));
      const { id } = req.params
      const requestData = req.body
      const requestRepository = new RequestRepository()
      const updatedRequest = await requestRepository.updateRequest(Number(id), requestData)
      console.log("✅ [Controller] Request atualizado com sucesso:", JSON.stringify(updatedRequest, null, 2));
      res.status(200).json({ message: 'Request updated', request: updatedRequest })
    } catch (error) {
      console.error("❌ [Controller] Erro ao atualizar Request:", error);
      return exceptionRouter(req, res, error)
    }
  }

  async deleteRequest(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      console.log(`📥 [Controller] Solicitando deleção da Request com ID: ${id}`);
      const requestRepository = new RequestRepository()
      await requestRepository.deleteRequest(Number(id))
      console.log("✅ [Controller] Request deletada com sucesso.");
      res.status(200).json({ message: 'Request deleted' })
    } catch (error) {
      console.error(`❌ [Controller] Erro ao deletar Request com ID ${req.params.id}:`, error);
      return exceptionRouter(req, res, error)
    }
  }

  async updateRequestStatus(req: Request, res: Response): Promise<void> {
    try {
      const requestRepository = new RequestRepository()
      const requestId = Number(req.params.id)
      const { status } = req.body
      console.log(`📥 [Controller] Atualizando status da Request ID ${requestId} para ${status}`);
      if (!status) {
        res.status(404).json({ message: 'Status is required' })
      }
      
      if (!Object.values(RequestStatusEnum).includes(status)) {
        res.status(400).json({ message: 'Invalid status value' })
        return
      }
      
      const updatedRequest = await requestRepository.updateOnlyStatus(requestId, status)
      console.log("✅ [Controller] Status da Request atualizado com sucesso:", JSON.stringify(updatedRequest, null, 2))
      res.status(200).json({ 
        message: 'Status atualizado com sucesso', 
        request: updatedRequest 
      })
    } catch (error) {
      console.error(`❌ [Controller] Erro ao atualizar status da Request com ID ${req.params.id}:`, error);
      return exceptionRouter(req, res, error)
    }
  }

  async searchRequests(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Dados recebidos para pesquisa:", JSON.stringify(req.body, null, 2));
      const requestRepository = new RequestRepository()
      const requests = await requestRepository.searchRequests(req.body)
      console.log("✅ [Controller] Requests encontradas na pesquisa:", JSON.stringify(requests, null, 2));
      res.status(200).json(requests)
    } catch (error) {
      console.error("❌ [Controller] Erro ao pesquisar Requests:", error);
      return exceptionRouter(req, res, error)
    }
  }

  async getPaginatedRequests(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query
      console.log(`📥 [Controller] Dados para paginação - page: ${page}, limit: ${limit}`)
      
      const requestRepository = new RequestRepository()
      const { data, total } = await requestRepository.getPaginatedRequests(Number(page), Number(limit))
      
      const formattedRequests = data.map(reqObj => formatRequest(reqObj));
      console.log("✅ [Controller] Requests paginadas retornadas:", JSON.stringify({ formattedRequests, total }, null, 2))
      res.status(200).json({
        formattedRequests,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit))
      })
    } catch (error) {
      console.error("❌ [Controller] Erro ao buscar requests paginadas:", error)
      return exceptionRouter(req, res, error)
    }
  }

  async getPaginatedRequestsByMe(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query
      const { id } = req.params
      console.log(`📥 [Controller] Dados para paginação - page: ${page}, limit: ${limit}, id: ${id}`)
      const requestRepository = new RequestRepository()
      const { data, total } = await requestRepository.getPaginatedRequestsByMe(Number(page), Number(limit), Number(id))
      const formattedRequests = data.map(reqObj => formatRequest(reqObj));
      console.log("✅ [Controller] Requests paginadas retornadas:", JSON.stringify({ formattedRequests, total }, null, 2))
      res.status(200).json({
        formattedRequests,
        total,
      })
    } catch (error) {
      console.error("❌ [Controller] Erro ao buscar requests paginadas:", error)
      return exceptionRouter(req, res, error)
    }
  }

  async getRequestsByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params
      console.log(`📥 [Controller] Buscando Requests com status: ${status}`)
      
      if (!Object.values(RequestStatusEnum).includes(status as RequestStatusEnum)) {
        res.status(400).json({ message: 'Status inválido' })
        return
      }

      const requestRepository = new RequestRepository()
      const requests = await requestRepository.getRequestsByStatus(status as RequestStatusEnum)
      const formattedRequests = requests.map(reqObj => formatRequest(reqObj))
      
      console.log("✅ [Controller] Requests encontradas:", JSON.stringify(formattedRequests, null, 2))
      res.status(200).json({ requests: formattedRequests })
    } catch (error) {
      console.error("❌ [Controller] Erro ao buscar requests por status:", error)
      return exceptionRouter(req, res, error)
    }
  }

  async updateTeacherConsent(req: Request, res: Response): Promise<void> {
    try {
      const { requestId, teacherId, disciplineId } = req.params
      const { signature, consent, justification } = req.body
      
      console.log(`📥 [Controller] Atualizando consentimento do professor ${teacherId} para a disciplina ${disciplineId} na request ${requestId}`)
      
      if (!signature) {
        res.status(400).json({ message: 'Assinatura é obrigatória' })
        return
      }
      
      const requestRepository = new RequestRepository()
      const updatedRequest = await requestRepository.updateTeacherConsent(
        Number(requestId),
        Number(teacherId),
        Number(disciplineId),
        signature,
        consent || false,
        justification
      )
      
      console.log("✅ [Controller] Consentimento do professor atualizado com sucesso")
      res.status(200).json({ 
        message: 'Consentimento atualizado com sucesso', 
        request: updatedRequest 
      })
    } catch (error) {
      console.error("❌ [Controller] Erro ao atualizar consentimento do professor:", error)
      return exceptionRouter(req, res, error)
    }
  }
}

export default new RequestController()
