// src/repositories/implementations/CourseRepository.ts
import { Repository } from 'typeorm'
import AppDataSource from '../../config/ormconfig'
import { ICourseRepository } from '../ICourseRepository'
import { Course } from '../../entities/course/CourseEntity'

export default class CourseRepository implements ICourseRepository {
  private repository: Repository<Course>;

  constructor() {
    this.repository = AppDataSource.getRepository(Course);
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    console.log("🔍 Dados recebidos no repositório (create):", JSON.stringify(course, null, 2));
    const newCourse = this.repository.create(course);
    console.log("🛠️ Dados preparados para o banco (create):", JSON.stringify(newCourse, null, 2));
    return this.repository.save(newCourse);
  }

  async getCourseById(id: number): Promise<Course | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["coordinators", "teachers", "disciplines"],
    });
  }

  async getAllCourses(): Promise<Course[]> {
    return this.repository.find({
      relations: ["coordinators", "teachers", "disciplines"],
    });
  }

  async updateCourse(id: number, course: Partial<Course>): Promise<Course> {
    console.log(`🔍 Dados recebidos no repositório (update) para ID ${id}:`, JSON.stringify(course, null, 2));
    
    const existingCourse = await this.repository.findOne({ 
      where: { id },
      relations: ["coordinators", "teachers", "disciplines"]
    });
    
    if (!existingCourse) {
      console.warn(`⚠️ Curso com ID ${id} não encontrado.`);
      throw new Error("Course not found");
    }
  
    if (course.name) existingCourse.name = course.name;
    
    if (course.coordinators) existingCourse.coordinators = course.coordinators;
    if (course.teachers) existingCourse.teachers = course.teachers;
    if (course.disciplines) existingCourse.disciplines = course.disciplines;

    return await this.repository.save(existingCourse);
  }
  
  async deleteCourse(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async searchCourses(criteria: Partial<Course>): Promise<Course[]> {
    return this.repository.find({ where: criteria as any });
  }
}
