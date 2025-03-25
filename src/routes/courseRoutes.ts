// src/routes/courseRoutes.ts
import { Router } from 'express'
import CourseController from '../controllers/CourseController'
import { authenticate } from '../middlewares/authMiddleware'

const courseRoutes = Router()

courseRoutes.use(authenticate)

courseRoutes.post("/", CourseController.createCourse)
courseRoutes.get("/", CourseController.getAllCourses)
courseRoutes.get("/:id", CourseController.getCourseById)
courseRoutes.put("/:id", CourseController.updateCourse)
courseRoutes.delete("/:id", CourseController.deleteCourse)

export default courseRoutes
