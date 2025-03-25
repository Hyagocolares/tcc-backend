// src/controllers/CourseController.ts
import { Request, Response } from 'express'
import { exceptionRouter } from '../utils/utilsRequest'
import CourseRepository from '../repositories/implementations/CourseRepository'

class CourseController {
  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Dados recebidos para criação:", JSON.stringify(req.body, null, 2));

      const courseRepository = new CourseRepository()
      const courseData = req.body
      const newCourse = await courseRepository.createCourse(courseData)

      console.log("✅ [Controller] Curso criado com sucesso:", JSON.stringify(newCourse, null, 2));
      res.status(201).json({ message: "Course created", course: newCourse })
    } catch (error: any) {
      console.error(`❌ [Controller] Erro ao criar curso: `, error);
      return exceptionRouter(req, res, error)
    }
  }

  async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const courseRepository = new CourseRepository()
      const courses = await courseRepository.getAllCourses()
      res.status(200).json({ courses })
    } catch (error: any) {
      console.error(`❌ Erro ao buscar curso: `, error);
      return exceptionRouter(req, res, error)
    }
  }

  async getCourseById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const courseRepository = new CourseRepository()
      const course = await courseRepository.getCourseById(Number(id))
      if (!course) {
        res.status(404).json({ message: "Course not found" })
        return
      }
      res.status(200).json({ course })
    } catch (error: any) {
      console.error(`❌ Erro ao buscar curso ${id}: `, error);
      return exceptionRouter(req, res, error)
    }
  }

  async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Dados recebidos para atualização:", JSON.stringify(req.body, null, 2));

      const courseRepository = new CourseRepository()
      const { id } = req.params
      const courseData = req.body

      const { user, ...filteredCourseData } = courseData;
      console.log("🔍 [Controller] Dados filtrados para atualização:", JSON.stringify(filteredCourseData, null, 2));

      const updatedCourse = await courseRepository.updateCourse(Number(id), filteredCourseData)

      console.log("✅ [Controller] Curso atualizado com sucesso:", JSON.stringify(updatedCourse, null, 2));
      res.status(200).json({ message: "Course updated", course: updatedCourse })
    } catch (error: any) {
      console.error("❌ [Controller] Erro ao atualizar curso:", error);
      return exceptionRouter(req, res, error)
    }
  }

  async deleteCourse(req: Request, res: Response): Promise<void> {
    try {
      const courseRepository = new CourseRepository()
      const { id } = req.params
      await courseRepository.deleteCourse(Number(id))
      res.status(200).json({ message: "Course deleted" })
    } catch (error: any) {
      console.error(`❌ Erro ao deletar curso: `, error);
      return exceptionRouter(req, res, error)
    }
  }

  async searchCourses(req: Request, res: Response): Promise<void> {
    try {
      const courseRepository = new CourseRepository()
      const courses = await courseRepository.searchCourses(req.body)
      res.status(200).json(courses)
    } catch (error) {
      console.error(`❌ Erro ao buscar curso: `, error);
      return exceptionRouter(req, res, error)
    }
  }

}

export default new CourseController()
