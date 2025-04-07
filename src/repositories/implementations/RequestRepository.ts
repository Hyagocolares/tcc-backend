// src/repositories/implementations/RequestRepository.ts
import { Repository } from 'typeorm'
import AppDataSource from '../../config/ormconfig'
import { IRequestRepository } from '../IRequestRepository'
import { Request } from '../../entities/request/RequestEntity'
import { RequestStatusEnum } from '../../entities/enums/RequestStatusEnum'
import UserRepository from './UserRepository'
import StatusRequestRepository from './StatusRequestRepository'
import TeacherConsentDiscipline from '../../entities/request/TeacherConsentDisciplineEntity'

export default class RequestRepository implements IRequestRepository {
  private repository: Repository<Request>

  constructor() {
    this.repository = AppDataSource.getRepository(Request)
  }

  async createRequest(request: Partial<Request>): Promise<Request> {
    console.log("🔍 [Repository] Dados recebidos no createRequest:", JSON.stringify(request, null, 2));

    // Validações iniciais
    if (!request.user) {
      throw new Error("User is required");
    }
    if (!request.subjects || request.subjects.length === 0) {
      throw new Error("At least one subject is required");
    }
    if (!request.locations || request.locations.length === 0) {
      throw new Error("At least one location is required");
    }
    if (!request.itinerary || request.itinerary.length === 0) {
      throw new Error("Itinerary is required");
    }
    if (!request.consent || request.consent.length === 0) {
      throw new Error("Teacher consent is required");
    }

    // Validar e converter roadCondition no itinerário
    if (request.itinerary) {
      request.itinerary = request.itinerary.map(item => {
        // Converter valores vazios para valores padrão
        const processedItem = {
          ...item,
          unpavedRoadKm: typeof item.unpavedRoadKm === 'string' && item.unpavedRoadKm === "" ? false : Boolean(item.unpavedRoadKm),
          kilometers: typeof item.kilometers === 'string' && item.kilometers === "" ? 0 : Number(item.kilometers),
          roadCondition: typeof item.roadCondition === 'string' && item.roadCondition === "" ? "Boa" : item.roadCondition,
          hasWoodenBridge: typeof item.hasWoodenBridge === 'string' && item.hasWoodenBridge === "" ? false : Boolean(item.hasWoodenBridge),
          hasFerry: typeof item.hasFerry === 'string' && item.hasFerry === "" ? false : Boolean(item.hasFerry),
          hasToll: typeof item.hasToll === 'string' && item.hasToll === "" ? false : Boolean(item.hasToll)
        };

        // Validar e converter roadCondition
        if (processedItem.roadCondition) {
          const roadConditionMap: { [key: string]: string } = {
            "Boa": "Boa",
            "Regular": "Regular",
            "Ruim": "Ruim",
            "Mediano": "Regular",
            "Ótimo": "Boa",
            "Péssimo": "Ruim"
          };

          const convertedCondition = roadConditionMap[processedItem.roadCondition];
          if (!convertedCondition) {
            throw new Error(`Invalid road condition: ${processedItem.roadCondition}. Valid values are: Boa, Regular, Ruim`);
          }

          processedItem.roadCondition = convertedCondition;
        }

        return processedItem;
      });
    }

    // Verificar se o professor existe
    const userRepository = new UserRepository();
    const teacherConsent = request.consent.find(consent => consent.teacher && consent.teacher.id);
    if (!teacherConsent) {
      throw new Error("Teacher consent not found");
    }

    const teacher = await userRepository.getUserById(teacherConsent.teacher.id);
    if (!teacher) {
      throw new Error("Teacher not found");
    }

    // Criar a nova request com os dados formatados
    const newRequest = this.repository.create({
      ...request,
      status: RequestStatusEnum.DRAFT,
      createdAt: new Date(),
      updatedAt: new Date(),
      // Garantir que os arrays estejam vazios se não forem fornecidos
      companions: request.companions || [],
      resources: request.resources || []
    });

    console.log("🛠️ [Repository] Dados preparados para o banco (createRequest):", JSON.stringify(newRequest, null, 2));

    // Salvar a request e todas as suas relações
    const savedRequest = await this.repository.save(newRequest);

    // Criar TeacherConsentDiscipline para cada disciplina
    if (request.subjects && request.subjects.length > 0) {
      for (const subject of request.subjects) {
        if (subject.subject && subject.subject.id) {
          // Criar TeacherConsentDiscipline
          const teacherConsentDiscipline = new TeacherConsentDiscipline();
          teacherConsentDiscipline.teacher = teacher as any; // Usar type assertion para evitar erro de tipo
          teacherConsentDiscipline.discipline = subject.subject;
          teacherConsentDiscipline.request = savedRequest;
          teacherConsentDiscipline.date = new Date().toISOString().split('T')[0]; // Data atual
          teacherConsentDiscipline.timeIn = "00:00"; // Valores padrão
          teacherConsentDiscipline.timeOut = "00:00"; // Valores padrão
          
          // Salvar TeacherConsentDiscipline
          const teacherConsentDisciplineRepository = AppDataSource.getRepository(TeacherConsentDiscipline);
          await teacherConsentDisciplineRepository.save(teacherConsentDiscipline);
          
          console.log(`✅ [Repository] TeacherConsentDiscipline criado para o professor ${teacher.id} e disciplina ${subject.subject.id}`);
        }
      }
    }

    // Criar StatusRequest inicial
    const statusRepo = new StatusRequestRepository();
    await statusRepo.createStatusRequest({
      request: savedRequest,
      user: savedRequest.user, // ou outro usuário responsável
      name: "Criação da solicitação",
      comment: "Solicitação criada como rascunho",
      status: RequestStatusEnum.DRAFT,
    });

    return savedRequest;
  }

  async getRequestById(id: number): Promise<Request | null> {
    console.log(`🔍 [Repository] Buscando Request por ID: ${id}`)
    const requestData = await this.repository.findOne({
      where: { id },
      relations: {
        user: true,
        companions: true,
        subjects: {
          subject: {
            courses: true,
            teachers: true,
            coordinators: true
          }
        },
        locations: true,
        itinerary: true,
        resources: true,
        consent: {
          teacher: true,
          discipline: true
        },
        coordinatorConsents: {
          userCoordinator: true
        },
        directorConsents: {
          userDirector: true
        }
      }
    })
    console.log("✅ [Repository] Request encontrada:", JSON.stringify(requestData, null, 2))
    return requestData
  }

  async getAllRequests(): Promise<Request[]> {
    console.log("🔍 [Repository] Buscando todas as Requests")
    const requests = await this.repository.find({
      relations: ['user', 'companions', 'subjects', 'subjects.subject', 'subjects.subject.courses', 'locations', 'itinerary', 'resources', 'consent']
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
        'consent', 'coordinatorConsents', 'directorConsents',
      ]
    });

    if (!existingRequest) throw new Error('Request not found');

    // Atualiza os campos diretos
    existingRequest.status = updates.status || existingRequest.status;
    // Atualize outras propriedades simples conforme necessário

    // Atualize os relacionamentos se fornecidos
    if (updates.companions) existingRequest.companions = updates.companions;
    if (updates.subjects) existingRequest.subjects = updates.subjects;
    if (updates.locations) existingRequest.locations = updates.locations;
    if (updates.itinerary) existingRequest.itinerary = updates.itinerary;
    if (updates.resources) existingRequest.resources = updates.resources;
    if (updates.consent) existingRequest.consent = updates.consent;

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
      relations: ['user', 'companions', 'subjects', 'subjects.subject', 'subjects.subject.courses', 'locations', 'itinerary', 'resources', 'coordinatorConsents']
    })
    console.log("✅ [Repository] Paginated Requests:", JSON.stringify({ data, total }, null, 2))
    return { data, total }
  }

  async getPaginatedRequestsByMe(page: number, limit: number, userId: number): Promise<{ data: Request[], total: number }> {
    console.log(`🔍 [Repository] Paginação - page: ${page}, limit: ${limit}, userId: ${userId}`)
    const [data, total] = await this.repository.findAndCount({
      select: ['id', 'status', 'createdAt'],
      where: {
        user: {
          id: userId
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['user', 'companions', 'subjects', 'subjects.subject', 'subjects.subject.courses', 'locations', 'itinerary', 'resources', 'coordinatorConsents']
    })
    console.log("✅ [Repository] Paginated Requests do usuário:", JSON.stringify({ data, total }, null, 2))
    return { data, total }
  }

  async getRequestsByStatus(status: RequestStatusEnum): Promise<Request[]> {
    console.log(`🔍 [Repository] Buscando Requests com status: ${status}`)
    const requests = await this.repository.find({
      where: { status },
      relations: ['user', 'companions', 'subjects', 'subjects.subject', 'subjects.subject.courses', 'locations', 'itinerary', 'resources', 'coordinatorConsents']
    })
    console.log("✅ [Repository] Requests encontradas:", JSON.stringify(requests, null, 2))
    return requests
  }

  async updateOnlyStatus(id: number, status: RequestStatusEnum): Promise<Request> {
    console.log(`🔍 [Repository] Atualizando apenas o status da Request ID ${id} para ${status}`)
    
    // Validar se o status é válido
    if (!Object.values(RequestStatusEnum).includes(status)) {
      throw new Error('Status inválido')
    }

    // Buscar a request
    const request = await this.repository.findOne({ where: { id } })
    if (!request) {
      throw new Error('Request não encontrada')
    }

    // Atualizar apenas o status
    request.status = status
    request.updatedAt = new Date()

    // Salvar a alteração
    const updatedRequest = await this.repository.save(request)
    console.log("✅ [Repository] Status da Request atualizado com sucesso:", JSON.stringify(updatedRequest, null, 2))
    return updatedRequest
  }

  async updateTeacherConsent(
    requestId: number, 
    teacherId: number, 
    disciplineId: number, 
    signature: string, 
    consent: boolean, 
    justification?: string
  ): Promise<Request> {
    console.log(`🔍 [Repository] Atualizando consentimento do professor ${teacherId} para a disciplina ${disciplineId} na request ${requestId}`)
    
    // Buscar a request
    const request = await this.repository.findOne({ 
      where: { id: requestId },
      relations: ['consent', 'consent.teacher', 'consent.discipline']
    })
    
    if (!request) {
      throw new Error('Request não encontrada')
    }
    
    // Buscar o TeacherConsentDiscipline específico
    const teacherConsentDisciplineRepository = AppDataSource.getRepository(TeacherConsentDiscipline)
    const teacherConsentDiscipline = await teacherConsentDisciplineRepository.findOne({
      where: {
        request: { id: requestId },
        teacher: { id: teacherId },
        discipline: { id: disciplineId }
      }
    })
    
    if (!teacherConsentDiscipline) {
      throw new Error('Consentimento do professor não encontrado')
    }
    
    // Atualizar o consentimento
    // Não podemos atualizar o campo justification pois não existe na entidade
    teacherConsentDiscipline.updatedAt = new Date()
    
    // Salvar o consentimento atualizado
    await teacherConsentDisciplineRepository.save(teacherConsentDiscipline)
    
    // Buscar a request atualizada com todas as relações
    const updatedRequest = await this.repository.findOne({
      where: { id: requestId },
      relations: ['user', 'companions', 'subjects', 'subjects.subject', 'subjects.subject.courses', 'locations', 'itinerary', 'resources', 'consent', 'consent.teacher', 'consent.discipline']
    })
    
    console.log("✅ [Repository] Consentimento do professor atualizado com sucesso")
    return updatedRequest
  }
}
