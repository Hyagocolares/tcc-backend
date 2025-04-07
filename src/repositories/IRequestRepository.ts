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
  getRequestsByStatus(status: RequestStatusEnum): Promise<Request[]>
  updateOnlyStatus(id: number, status: RequestStatusEnum): Promise<Request>
  updateTeacherConsent(requestId: number, teacherId: number, disciplineId: number, signature: string, consent: boolean, justification?: string): Promise<Request>
}
