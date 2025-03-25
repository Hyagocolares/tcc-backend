// src/repositories/IStatusRequestRepository.ts
import StatusRequest from '../entities/StatusRequestEntity'

export interface IStatusRequestRepository {
  createStatusRequest(data: Partial<StatusRequest>): Promise<StatusRequest>
  findStatusRequestById(id: number): Promise<StatusRequest | undefined>
  findAllStatusRequest(): Promise<StatusRequest[]>
  updateStatusRequest(id: number, data: Partial<StatusRequest>): Promise<StatusRequest>
  deleteStatusRequest(id: number): Promise<void>
}
