// src/repositories/StatusRequestRepository.ts
import { Repository } from 'typeorm'
import AppDataSource from '../../config/ormconfig'
import { IStatusRequestRepository } from '../IStatusRequestRepository'
import StatusRequest from '../../entities/StatusRequestEntity'

export default class StatusRequestRepository implements IStatusRequestRepository {
    private repository: Repository<StatusRequest>

    constructor() {
        this.repository = AppDataSource.getRepository(StatusRequest)
    }

    async createStatusRequest(data: Partial<StatusRequest>): Promise<StatusRequest> {
        const statusRequest = this.repository.create(data)
        return this.repository.save(statusRequest)
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
        return updatedStatusRequest
    }

    async deleteStatusRequest(id: number): Promise<void> {
        await this.repository.delete(id)
    }
}