// src/routes/disciplineRoutes.ts
import { Router } from 'express'
import DisciplineController from '../controllers/DisciplineController'
import { authenticate } from '../middlewares/authMiddleware'

const disciplineRoutes = Router()

disciplineRoutes.use(authenticate)

disciplineRoutes.post("/", DisciplineController.createDiscipline)
disciplineRoutes.get("/", DisciplineController.getAllDisciplines)
disciplineRoutes.get("/:id", DisciplineController.getDisciplineById)
disciplineRoutes.put("/:id", DisciplineController.updateDiscipline)
disciplineRoutes.delete("/:id", DisciplineController.deleteDiscipline)

export default disciplineRoutes
