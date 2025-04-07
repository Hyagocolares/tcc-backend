// src/repositories/implementations/DisciplineRepository.ts
import { Repository } from 'typeorm';
import AppDataSource from '../../config/ormconfig';
import { IDisciplineRepository } from '../IDisciplineRepository';
import { Discipline } from '../../entities/course/DisciplineEntity';

export default class DisciplineRepository implements IDisciplineRepository {
  private repository: Repository<Discipline>;

  constructor() {
    this.repository = AppDataSource.getRepository(Discipline);
  }

  async createDiscipline(discipline: Partial<Discipline>): Promise<Discipline> {
    const newDiscipline = this.repository.create(discipline);
    return this.repository.save(newDiscipline);
  }

  async getDisciplineById(id: number): Promise<Discipline | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["courses", "teachers", "coordinators"],
    });
  }

  async getAllDisciplines(): Promise<Discipline[]> {
    return this.repository.find({
      relations: ["courses", "teachers", "coordinators"],
    });
  }

  async updateDiscipline(id: number, discipline: Partial<Discipline>): Promise<Discipline> {
    console.log(`🔍 Dados recebidos no repositório (update) para ID ${id}:`, JSON.stringify(discipline, null, 2));
    
    const existingDiscipline = await this.repository.findOne({
      where: { id },
      relations: ["courses", "teachers", "coordinators"]
    });

    if (!existingDiscipline) {
      console.warn(`⚠️ Discipline com ID ${id} não encontrado.`);
      throw new Error("Discipline not found");
    }

    if (discipline.name) existingDiscipline.name = discipline.name;
    if (discipline.code) existingDiscipline.code = discipline.code;
    if (discipline.workload) existingDiscipline.workload = discipline.workload;

    if (discipline.courses) existingDiscipline.courses = discipline.courses;
    if (discipline.teachers) existingDiscipline.teachers = discipline.teachers;
    if (discipline.coordinators) existingDiscipline.coordinators = discipline.coordinators;

    return await this.repository.save(existingDiscipline);
  }

  async deleteDiscipline(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async searchDisciplines(criteria: Partial<Discipline>): Promise<Discipline[]> {
    return this.repository.find({ where: criteria as any });
  }
}
