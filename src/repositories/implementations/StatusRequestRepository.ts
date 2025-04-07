// src/repositories/StatusRequestRepository.ts
import { Repository } from 'typeorm'
import AppDataSource from '../../config/ormconfig'
import { IStatusRequestRepository } from '../IStatusRequestRepository'
import StatusRequest from '../../entities/StatusRequestEntity'
import { Request } from '../../entities/request/RequestEntity'

export default class StatusRequestRepository implements IStatusRequestRepository {
    private repository: Repository<StatusRequest>
    private requestRepository: Repository<Request>

    constructor() {
        this.repository = AppDataSource.getRepository(StatusRequest)
        this.requestRepository = AppDataSource.getRepository(Request)
    }

    async createStatusRequest(data: Partial<StatusRequest>): Promise<StatusRequest> {
        const statusRequest = this.repository.create(data)
        const savedStatusRequest = await this.repository.save(statusRequest)
        // Atualizar o status da Request ao criar um novo StatusRequest
        if (savedStatusRequest.request) {
            await this.requestRepository.update(savedStatusRequest.request.id, { status: savedStatusRequest.status })
        }

        return savedStatusRequest
    }

    async findStatusRequestById(id: number): Promise<StatusRequest | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['request', 'user'],
        })
    }

    async findAllStatusRequest(): Promise<StatusRequest[]> {
        return this.repository.find({
            relations: ['request', 'user'],
        })
    }

    async updateStatusRequest(id: number, data: Partial<StatusRequest>): Promise<StatusRequest> {
        await this.repository.update(id, data)
        const updatedStatusRequest = await this.repository.findOneBy({ id })
        if (!updatedStatusRequest) {
            throw new Error('StatusRequest not found')
        }

        // Atualizar o status da Request ao modificar um StatusRequest existente
        if (updatedStatusRequest.request) {
            await this.requestRepository.update(updatedStatusRequest.request.id, { status: updatedStatusRequest.status })
        }

        return updatedStatusRequest
    }

    async deleteStatusRequest(id: number): Promise<void> {
        await this.repository.delete(id)
    }
}