// src/repositories/implementations/ConsentRepository.ts
import { Repository } from "typeorm";
import AppDataSource from '../../config/ormconfig';
import { IConsentRepository } from "../IConsentRepository";
import { Consent, DirectorConsent } from "../../entities/consent/ConsentEntity";
import { Request } from "../../entities/request/RequestEntity";
import { RequestStatusEnum } from "../../entities/enums/RequestStatusEnum";

export default class ConsentRepository implements IConsentRepository {
  private repository: Repository<Consent>;
  private directorConsentRepository: Repository<DirectorConsent>;

  constructor() {
    this.repository = AppDataSource.getRepository(Consent);
    this.directorConsentRepository = AppDataSource.getRepository(DirectorConsent);
  }

  async createConsent(consent: Partial<Consent>): Promise<Consent> {
    const newConsent = this.repository.create(consent);
    return this.repository.save(newConsent);
  }

  async createDirectorConsent(consent: Partial<DirectorConsent>, requestId: number): Promise<DirectorConsent> {
    // Buscar a request
    const requestRepository = AppDataSource.getRepository(Request);
    const request = await requestRepository.findOne({ where: { id: requestId } });
    
    if (!request) {
      throw new Error('Request not found');
    }
    
    // Criar o consentimento do diretor
    const newDirectorConsent = this.directorConsentRepository.create({
      ...consent,
      request: request
    });
    
    // Salvar o consentimento
    const savedDirectorConsent = await this.directorConsentRepository.save(newDirectorConsent);
    
    // Atualizar o status da request para APPROVED ou REJECTED
    if (consent.accepted) {
      request.status = RequestStatusEnum.APPROVED;
    } else {
      request.status = RequestStatusEnum.REJECTED;
    }
    
    // Salvar a request atualizada
    await requestRepository.save(request);
    
    return savedDirectorConsent;
  }

  async getConsentById(id: number): Promise<Consent | null> {
    return this.repository.findOne({ where: { id } });
  }

  async getAllConsents(): Promise<Consent[]> {
    return this.repository.find();
  }

  async updateConsent(id: number, consent: Partial<Consent>): Promise<Consent> {
    await this.repository.update(id, consent);
    const updated = await this.repository.findOneBy({ id });
    if (!updated) throw new Error('Consent not found');
    return updated;
  }

  async deleteConsent(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async searchConsents(criteria: Partial<Consent>): Promise<Consent[]> {
    return this.repository.find({ where: criteria });
  }
}