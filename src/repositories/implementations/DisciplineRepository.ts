// src/repositories/implementations/DisciplineRepository.ts
import { Repository } from 'typeorm';
import AppDataSource from '../../config/ormconfig';
import { IDisciplineRepository } from '../IDisciplineRepository';
import { Discipline } from '../../entities/course/DisciplineEntity';
import { Course } from '../../entities/course/CourseEntity';

export default class DisciplineRepository implements IDisciplineRepository {
  private repository: Repository<Discipline>;
  private repositoryCourse: Repository<Course>;

  constructor() {
    this.repository = AppDataSource.getRepository(Discipline);
    this.repositoryCourse = AppDataSource.getRepository(Course);
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
    const existingDiscipline = await this.repository.findOne({
        where: { id },
        relations: ["courses", "teachers", "coordinators"]
    });

    if (!existingDiscipline) throw new Error("Discipline not found");

      existingDiscipline.name = discipline.name || existingDiscipline.name;
      if (discipline.courses) existingDiscipline.courses = discipline.courses;
      if (discipline.teachers) existingDiscipline.teachers = discipline.teachers;
      if (discipline.coordinators) existingDiscipline.coordinators = discipline.coordinators;
    
      return await this.repository.save(existingDiscipline);
    }

  // async updateDiscipline(id: number, discipline: Partial<Discipline>): Promise<Discipline> {
  //   await this.repository.update(id, discipline);
  //   const updated = await this.repository.findOneBy({ id });
  //   if (!updated) throw new Error("Discipline not found");
  //   return updated;
  // }

  async deleteDiscipline(id: number): Promise<void> {
    const discipline = await this.repository.findOne({
      where: { id },
      relations: ["courses"]
    });
    if (!discipline) throw new Error("Discipline not found");

    if (discipline.courses && discipline.courses.length > 0) {
      for (const course of discipline.courses) {
        course.disciplines = course.disciplines.filter(d => d.id !== discipline.id);
        await this.repositoryCourse.save(course);
      }
    }

    await this.repository.delete(id);
  }

  async searchDisciplines(criteria: Partial<Discipline>): Promise<Discipline[]> {
    return this.repository.find({ where: criteria as any });
  }
}