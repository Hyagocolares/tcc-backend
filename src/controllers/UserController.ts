// src/controllers/UserController.ts
import { Request, Response } from 'express'
import { exceptionRouter } from '../utils/utilsRequest'
import UserRepository from '../repositories/implementations/UserRepository'

class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = new UserRepository()
      const userData = req.body
      const { password, ...filteredUserData } = userData;
      console.log("🔍 Dados recebidos para criação de usuario:", JSON.stringify(userData, null, 2));
      const newUser = await userRepository.createUser(filteredUserData)
      res.status(201).json({ message: 'User created', user: newUser })
    } catch (error: any) {
      console.error(`❌ Erro ao criar usuário: `, error);
      return exceptionRouter(req, res, error)
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = new UserRepository()
      const users = await userRepository.getAllUsers()
      res.status(200).json({ users })
    } catch (error: any) {
      console.error(`❌ Erro ao buscar usuários: `, error);
      return exceptionRouter(req, res, error)
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const userRepository = new UserRepository()
      const user = await userRepository.getUserById(Number(id))
      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }
      res.status(200).json({ user })
    } catch (error) {
      console.error(`❌ Erro ao buscar usuário ${id}: `, error);
      return exceptionRouter(req, res, error)
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = new UserRepository();
      const { id } = req.params;
      const userData = req.body;

      const { user, ...filteredUserData } = userData;

      console.log("🔍 Dados filtrados para atualização:", JSON.stringify(filteredUserData, null, 2));

      const updatedUser = await userRepository.updateUser(Number(id), filteredUserData);
      res.status(200).json({ message: "User updated", user: updatedUser });
    } catch (error) {
      console.error("❌ Erro ao atualizar usuário:", error);
      return exceptionRouter(req, res, error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = new UserRepository()
      const { id } = req.params
      await userRepository.deleteUser(Number(id))
      res.status(200).json({ message: 'User deleted' })
    } catch (error) {
      console.error(`❌ Erro ao deletar usuário: `, error);
      return exceptionRouter(req, res, error)
    }
  }

  async findByEmail(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = new UserRepository()
      const email: string = req.params.email
      const user = await userRepository.findByEmail(email)
      if (!user) {
        res.status(404).json({ message: 'User not found' })
      }
    } catch (error) {
      console.error(`❌ Erro ao buscar usuário por email: `, error);
      return exceptionRouter(req, res, error)
    }
  }

  async searchUsers(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = new UserRepository()
      const users = await userRepository.searchUsers(req.body)
      res.status(200).json(users)
    } catch (error) {
      console.error(`❌ Erro ao buscar usuários filtrado: `, error);
      return exceptionRouter(req, res, error)
    }
  }
}

export default new UserController()
