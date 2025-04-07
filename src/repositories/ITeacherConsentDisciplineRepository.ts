import TeacherConsentDiscipline from "../entities/request/TeacherConsentDisciplineEntity";
import { Request as RequestEntity } from "../entities/request/RequestEntity";

export interface ITeacherConsentDisciplineRepository {
  createConsent(consentData: Partial<TeacherConsentDiscipline>): Promise<TeacherConsentDiscipline>;
  getConsentById(id: number): Promise<TeacherConsentDiscipline | null>;
  getAllConsents(): Promise<TeacherConsentDiscipline[]>;
  updateConsent(id: number, updates: Partial<TeacherConsentDiscipline>): Promise<TeacherConsentDiscipline>;
  deleteConsent(id: number): Promise<void>;
  getConsentsByUserId(teacherId: number): Promise<TeacherConsentDiscipline[]>;
  getRequestsByTeacherId(teacherId: number): Promise<RequestEntity[]>;
  getAllRequestsWithTeachers(): Promise<RequestEntity[]>;
}
