// src/controllers/DisciplineController.ts
import { Request, Response } from 'express'
import { exceptionRouter } from '../utils/utilsRequest'
import DisciplineRepository from '../repositories/implementations/DisciplineRepository'

class DisciplineController {
  async createDiscipline(req: Request, res: Response): Promise<void> {
    try {
      const disciplineRepository = new DisciplineRepository()
      const disciplineData = req.body
      const newDiscipline = await disciplineRepository.createDiscipline(disciplineData)
      res.status(201).json({ message: "Discipline created", discipline: newDiscipline })
    } catch (error: any) {
      return exceptionRouter(req, res, error)
    }
  }

  async getAllDisciplines(req: Request, res: Response): Promise<void> {
    try {
      const disciplineRepository = new DisciplineRepository()
      const disciplines = await disciplineRepository.getAllDisciplines()
      res.status(200).json({ disciplines })
    } catch (error: any) {
      return exceptionRouter(req, res, error)
    }
  }

  async getDisciplineById(req: Request, res: Response): Promise<void> {
    try {
      const disciplineRepository = new DisciplineRepository()
      const { id } = req.params
      const discipline = await disciplineRepository.getDisciplineById(Number(id))
      if (!discipline) {
        res.status(404).json({ message: "Discipline not found" })
        return
      }
      res.status(200).json({ discipline })
    } catch (error: any) {
      return exceptionRouter(req, res, error)
    }
  }

  async updateDiscipline(req: Request, res: Response): Promise<void> {
    try {
      const disciplineRepository = new DisciplineRepository()
      const { id } = req.params
      const disciplineData = req.body
      const updatedDiscipline = await disciplineRepository.updateDiscipline(Number(id), disciplineData)
      res.status(200).json({ message: "Discipline updated", discipline: updatedDiscipline })
    } catch (error: any) {
      return exceptionRouter(req, res, error)
    }
  }

  async deleteDiscipline(req: Request, res: Response): Promise<void> {
    try {
      const disciplineRepository = new DisciplineRepository()
      const { id } = req.params
      await disciplineRepository.deleteDiscipline(Number(id))
      res.status(200).json({ message: "Discipline deleted" })
    } catch (error: any) {
      return exceptionRouter(req, res, error)
    }
  }

  async searchDisciplines(req: Request, res: Response): Promise<void> {
    try {
      const disciplineRepository = new DisciplineRepository()
      const disciplines = await disciplineRepository.searchDisciplines(req.body)
      res.status(200).json(disciplines)
    } catch (error) {
      return exceptionRouter(req, res, error)
    }
  }
}

export default new DisciplineController()
