// src/repositories/implementations/TeacherConsentDisciplineRepository.ts
import { Repository } from "typeorm";
import AppDataSource from "../../config/ormconfig";
import TeacherConsentDiscipline from "../../entities/request/TeacherConsentDisciplineEntity";
import { ITeacherConsentDisciplineRepository } from "../ITeacherConsentDisciplineRepository";
import { Request as RequestEntity } from "../../entities/request/RequestEntity";

export default class TeacherConsentDisciplineRepository implements ITeacherConsentDisciplineRepository {
  private repository: Repository<TeacherConsentDiscipline>;

  constructor() {
    this.repository = AppDataSource.getRepository(TeacherConsentDiscipline);
  }

  async createConsent(consentData: Partial<TeacherConsentDiscipline>): Promise<TeacherConsentDiscipline> {
    const newConsent = this.repository.create(consentData);
    return this.repository.save(newConsent);
  }

  async getConsentById(id: number): Promise<TeacherConsentDiscipline | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        teacher: true,
        discipline: true,
        request: true
      }
    });
  }

  async getAllConsents(): Promise<TeacherConsentDiscipline[]> {
    return this.repository.find({
      relations: {
        teacher: true,
        discipline: true,
        request: true
      }
    });
  }

  async updateConsent(id: number, updates: Partial<TeacherConsentDiscipline>): Promise<TeacherConsentDiscipline> {
    await this.repository.update(id, updates);
    const existingConsent = await this.repository.findOne({
      where: { id },
      relations: {
        teacher: true,
        discipline: true,
        request: true
      }
    });
    if (!existingConsent) throw new Error("Consent not found");

    Object.assign(existingConsent, updates);
    return this.repository.save(existingConsent);
  }

  async deleteConsent(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async getConsentsByUserId(teacherId: number): Promise<TeacherConsentDiscipline[]> {
    return this.repository.find({
      where: { teacher: { id: teacherId } },
      relations: {
        teacher: true,
        discipline: true,
        request: true
      }
    });
  }

  async getRequestsByTeacherId(teacherId: number): Promise<RequestEntity[]> {
    const consents = await this.repository.find({
      where: { teacher: { id: teacherId } },
      relations: {
        teacher: true,
        discipline: true,
        request: true
      }
    });
    return consents.map(consent => consent.request);
  }

  async getAllRequestsWithTeachers(): Promise<RequestEntity[]> {
    const consents = await this.repository.find({
      relations: {
        teacher: true,
        discipline: true,
        request: true
      }
    });
    return consents.map(consent => consent.request);
  }
}
