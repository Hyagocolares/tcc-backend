// src/controllers/StatusRequestController.ts
import { Request, Response } from 'express'
import { exceptionRouter } from "../utils/utilsRequest"
import StatusRequestRepository from "../repositories/implementations/StatusRequestRepository"
import { RequestStatusEnum } from '../entities/enums/RequestStatusEnum'

class StatusRequestController {
  async createStatusRequest(req: Request, res: Response): Promise<void> {
    try {
      const statusRequestRepository = new StatusRequestRepository()
      const statusRequestData = req.body
      const newStatusRequest = await statusRequestRepository.createStatusRequest(statusRequestData)
      res.status(201).json({ message: 'StatusRequest created', statusRequest: newStatusRequest })
    } catch (error) {
      return exceptionRouter(req, res, error)
    }
  }

  async getAllStatusRequests(req: Request, res: Response): Promise<void> {
    try {
      const statusRequestRepository = new StatusRequestRepository()
      const statusRequests = await statusRequestRepository.findAllStatusRequest()
      res.status(200).json({ statusRequests })
    } catch (error) {
      return exceptionRouter(req, res, error)
    }
  }

  async getStatusRequestById(req: Request, res: Response): Promise<void> {
    try {
      const statusRequestRepository = new StatusRequestRepository()
      const { id } = req.params
      const statusRequestData = await statusRequestRepository.findStatusRequestById(Number(id))
      if (!statusRequestData) {
        res.status(404).json({ message: 'StatusRequest not found' })
        return
      }
      res.status(200).json({ statusRequest: statusRequestData })
    } catch (error) {
      return exceptionRouter(req, res, error)
    }
  }

  async updateStatusRequest(req: Request, res: Response): Promise<void> {
    try {
      const statusRequestRepository = new StatusRequestRepository()
      const { id } = req.params
      const statusRequestData = req.body

      if (!statusRequestData.status || !Object.values(RequestStatusEnum).includes(statusRequestData.status)) {
        res.status(400).json({ message: 'Invalid or missing status value' })
        return
      }

      const updatedStatusRequest = await statusRequestRepository.updateStatusRequest(Number(id), statusRequestData)
      res.status(200).json({ message: 'StatusRequest updated', statusRequest: updatedStatusRequest })
    } catch (error) {
      return exceptionRouter(req, res, error)
    }
  }

  async deleteStatusRequest(req: Request, res: Response): Promise<void> {
    try {
      const statusRequestRepository = new StatusRequestRepository()
      const { id } = req.params
      await statusRequestRepository.deleteStatusRequest(Number(id))
      res.status(200).json({ message: 'StatusRequest deleted' })
    } catch (error) {
      return exceptionRouter(req, res, error)
    }
  }
}

export default new StatusRequestController()