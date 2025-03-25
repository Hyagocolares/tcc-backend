// src/repositories/IDisciplineRepository.ts
import { Discipline } from '../entities/course/DisciplineEntity'

export interface IDisciplineRepository {
  createDiscipline(discipline: Partial<Discipline>): Promise<Discipline>;
  getDisciplineById(id: number): Promise<Discipline | null>;
  getAllDisciplines(): Promise<Discipline[]>;
  updateDiscipline(id: number, discipline: Partial<Discipline>): Promise<Discipline>;
  deleteDiscipline(id: number): Promise<void>;
  searchDisciplines(criteria: Partial<Discipline>): Promise<Discipline[]>;
}