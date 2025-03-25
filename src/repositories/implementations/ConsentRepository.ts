// src/repositories/implementations/ConsentRepository.ts
import { Repository } from "typeorm";
import AppDataSource from '../../config/ormconfig';
import { IConsentRepository } from "../IConsentRepository";
import { Consent } from "../../entities/consent/ConsentEntity";

export default class ConsentRepository implements IConsentRepository {
  private repository: Repository<Consent>;

  constructor() {
    this.repository = AppDataSource.getRepository(Consent);
  }

  async createConsent(consent: Partial<Consent>): Promise<Consent> {
    const newConsent = this.repository.create(consent);
    return this.repository.save(newConsent);
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