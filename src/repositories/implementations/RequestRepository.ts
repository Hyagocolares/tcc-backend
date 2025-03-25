// src/repositories/RequestRepository.ts
import { Repository } from 'typeorm'
import AppDataSource from '../../config/ormconfig'
import { IRequestRepository } from '../IRequestRepository'
import { Request } from '../../entities/request/RequestEntity'
import { RequestStatusEnum } from '../../entities/enums/RequestStatusEnum'

export default class RequestRepository implements IRequestRepository {
  private repository: Repository<Request>

  constructor() {
    this.repository = AppDataSource.getRepository(Request)
  }

  async createRequest(request: Partial<Request>): Promise<Request> {
    console.log("🔍 [Repository] Dados recebidos no createRequest:", JSON.stringify(request, null, 2))
    const newRequest = this.repository.create(request)
    console.log("🛠️ [Repository] Dados preparados para o banco (createRequest):", JSON.stringify(newRequest, null, 2))
    const savedRequest = await this.repository.save(newRequest)
    console.log("✅ [Repository] Request salvo com sucesso:", JSON.stringify(savedRequest, null, 2))
    return savedRequest
  }

  async getRequestById(id: number): Promise<Request | null> {
    console.log(`🔍 [Repository] Buscando Request por ID: ${id}`)
    const requestData = await this.repository.findOne({
      where: { id },
      relations: [
        'user', 'user.courses', 'companions', 'subjects', 'subjects.subject', 'subjects.subject.courses', 'locations',
        'itinerary', 'resources', 'teacher', 'coordinator',
        'teacherConsents', 'coordinatorConsents', 'directorConsents'
      ]
    })
    console.log("✅ [Repository] Request encontrada:", JSON.stringify(requestData, null, 2))
    return requestData
  }

  async getAllRequests(): Promise<Request[]> {
    console.log("🔍 [Repository] Buscando todas as Requests")
    const requests = await this.repository.find({
      relations: ['user', 'companions', 'subjects', 'subjects.subject', 'subjects.subject.courses', 'locations', 'itinerary', 'resources', 'teacher', 'coordinator']
    })
    console.log("✅ [Repository] Requests encontradas:", JSON.stringify(requests, null, 2))
    return requests
  }


  async updateRequest(id: number, updates: Partial<Request>): Promise<Request> {
    console.log(`🔍 [Repository] Dados recebidos para updateRequest (ID ${id}):`, JSON.stringify(updates, null, 2));
    // Buscar a entidade completa com as relações
    const existingRequest = await this.repository.findOne({
      where: { id },
      relations: [
        'companions', 'subjects', 'locations', 'itinerary', 'resources',
        'teacher', 'coordinator', 'teacherConsents', 'coordinatorConsents', 'directorConsents'
      ]
    });
    
    if (!existingRequest) {
      throw new Error('Request not found');
    }
    
    // Atualiza os campos diretos
    existingRequest.status = updates.status || existingRequest.status;
    // Atualize outras propriedades simples conforme necessário
    
    // Atualize os relacionamentos se fornecidos
    if (updates.companions) existingRequest.companions = updates.companions;
    if (updates.subjects) existingRequest.subjects = updates.subjects;
    if (updates.locations) existingRequest.locations = updates.locations;
    if (updates.itinerary) existingRequest.itinerary = updates.itinerary;
    if (updates.resources) existingRequest.resources = updates.resources;
    if (updates.teacher) existingRequest.teacher = updates.teacher;
    if (updates.coordinator) existingRequest.coordinator = updates.coordinator;
    
    // Salvar a entidade atualizada (isso cuidará das operações em tabelas de junção)
    const savedRequest = await this.repository.save(existingRequest);
    console.log("✅ [Repository] Request atualizada:", JSON.stringify(savedRequest, null, 2));
    return savedRequest;
  }

  
  async deleteRequest(id: number): Promise<void> {
    console.log(`🔍 [Repository] Deletando Request com ID ${id}`)
    await this.repository.delete(id)
    console.log("✅ [Repository] Request deletada com sucesso.")
  }

  async updateRequestStatus(id: number, status: RequestStatusEnum): Promise<Request> {
    console.log(`🔍 [Repository] Atualizando status da Request ID ${id} para ${status}`)
    const request = await this.repository.findOne({ where: { id } })
    if (!request) throw new Error('Request not found')
    request.status = status
    const savedRequest = await this.repository.save(request)
    console.log("✅ [Repository] Status da Request atualizado:", JSON.stringify(savedRequest, null, 2))
    return savedRequest
  }

  async searchRequests(criteria: Partial<Request>): Promise<Request[]> {
    console.log("🔍 [Repository] Pesquisando Requests com critérios:", JSON.stringify(criteria, null, 2))
    const requests = await this.repository.find({ where: criteria })
    console.log("✅ [Repository] Requests encontradas:", JSON.stringify(requests, null, 2))
    return requests
  }

  async getPaginatedRequests(page: number, limit: number): Promise<{ data: Request[], total: number }> {
    console.log(`🔍 [Repository] Paginação - page: ${page}, limit: ${limit}`)
    const [data, total] = await this.repository.findAndCount({
      select: ['id', 'status', 'createdAt'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['user', 'companions', 'subjects', 'subjects.subject', 'subjects.subject.courses', 'locations', 'itinerary', 'resources', 'teacher', 'coordinator']
    })
    console.log("✅ [Repository] Paginated Requests:", JSON.stringify({ data, total }, null, 2))
    return { data, total }
  }
  
}
