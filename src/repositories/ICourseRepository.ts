// src/repositories/ICourseRepository.ts
import { Course } from "../entities/course/CourseEntity"

export interface ICourseRepository {
  createCourse(course: Partial<Course>): Promise<Course>;
  getCourseById(id: number): Promise<Course | null>;
  getAllCourses(): Promise<Course[]>;
  updateCourse(id: number, course: Partial<Course>): Promise<Course>;
  deleteCourse(id: number): Promise<void>;
  searchCourses(criteria: Partial<Course>): Promise<Course[]>;
}