// src/controllers/RequestController.ts
import { Request, Response } from 'express'
import { exceptionRouter } from '../utils/utilsRequest'
import RequestRepository from '../repositories/implementations/RequestRepository'
import { RequestStatusEnum } from '../entities/enums/RequestStatusEnum'
import { formatRequest } from '../utils/formatRequest';

class RequestController {
  async createRequest(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Dados recebidos para criação:", JSON.stringify(req.body, null, 2));
      const requestRepository = new RequestRepository()
      const requestData = req.body
      const newRequest = await requestRepository.createRequest(requestData)
      console.log("✅ [Controller] Request criado com sucesso:", JSON.stringify(newRequest, null, 2));
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
      const updated = await requestRepository.updateRequestStatus(requestId, status)
      console.log("✅ [Controller] Status da Request atualizado com sucesso:", JSON.stringify(updated, null, 2));
      res.status(200).json(updated)
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

}

export default new RequestController()
