// src/repositories/IRequestRepository.ts
import { RequestStatusEnum } from '../entities/enums/RequestStatusEnum'
import { Request } from '../entities/request/RequestEntity'
import { User } from '../entities/user/UserEntity'

export interface IRequestRepository {
  createRequest(request: Partial<Request>, userId: number): Promise<Request>
  getRequestById(id: number): Promise<Request | null>
  getAllRequests(user?: User): Promise<Request[]>
  updateRequest(id: number, updates: Partial<Request>): Promise<Request>
  deleteRequest(id: number): Promise<void>
  updateRequestStatus(id: number, status: RequestStatusEnum): Promise<Request>
  searchRequests(criteria: Partial<Request>): Promise<Request[]>
}
