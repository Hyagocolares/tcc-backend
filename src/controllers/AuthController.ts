// src/controllers/authController.ts
import { Request, Response } from 'express'
import { exceptionRouter } from '../utils/utilsRequest'
import UserRepository from '../repositories/implementations/UserRepository'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../entities/user/UserEntity'
import { sendWelcomeEmail } from '../services/emailService'

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = new UserRepository()

      const { name, email, password, category } = req.body

      if (!name || !email || !password) {
        res.status(400).json({ message: 'All fields are required' })
      }

      const existingUser = await userRepository.findByEmail(email)
      if (existingUser) {
        res.status(409).json({ message: 'User already exists' })
        return
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser: User = {
        id: 0,
        name,
        email,
        password: hashedPassword,
        category,
        requests: [],
        statusRequests: [],
        isFirstLogin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const userCreated = await userRepository.createUser(newUser)

      if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
        throw new Error('JWT_SECRET is not defined')
      }

      const token = jwt.sign(
        { id: userCreated.id, email: userCreated.email },
        (process.env.JWT_SECRET as jwt.Secret),
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } as jwt.SignOptions
      )

      // Envia e-mail de boas-vindas com as informações de acesso
      await sendWelcomeEmail(userCreated.email, {
        name: userCreated.name,
        email: userCreated.email,
        senha: password,
        instructions: "Utilize suas credenciais para acessar o sistema e finalize seu cadastro para atualizar suas informações."
      });

      res.status(201).json({
        message: 'User registered successfully. Please check your email for login details and next steps.',
        user: {
          id: userCreated.id,
          name: userCreated.name,
          email: userCreated.email,
          category: userCreated.category,
          createdAt: userCreated.createdAt,
          isFirstLogin: userCreated.isFirstLogin
        },
        token
      })
    } catch (error) {
      console.error(`❌ Erro ao regstrar um usuário: `, error);
      return exceptionRouter(req, res, error)
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = new UserRepository()
      const { email, password } = req.body

      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' })
        return
      }

      const user = await userRepository.findByEmail(email)

      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' })
        return
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' })
        return
      }

      if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
        throw new Error('JWT_SECRET is not defined')
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, category: user.category },
        process.env.JWT_SECRET as jwt.Secret,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } as jwt.SignOptions
      )

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          category: user.category,
          createdAt: user.createdAt
        },
        token
      })
      return
    } catch (error) {
      console.error(`❌ Erro de login: `, error);
      return exceptionRouter(req, res, error)
    }
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = new UserRepository()

      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        res.status(401).json({ message: 'No token provided' })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }

      const userData = await userRepository.getUserById(parseInt(decoded.id, 10))
      if (!userData) {
        res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json({
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          category: userData.category,
          createdAt: userData.createdAt,
        },
      })
    } catch (error) {
      console.error(`❌ Erro de buscar o profile : `, error);
      return exceptionRouter(req, res, error)
    }
  }

  async finalizeRegistration(req: Request, res: Response): Promise<void> {
    const { id, additionalData } = req.body
    const userRepository = new UserRepository();
    const user = await userRepository.getUserById(id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    if (!user.isFirstLogin) {
      res.status(400).json({ message: 'Registro já finalizado' });
      return;
    }
    const updatedUser = await userRepository.updateUser(user.id, {
      ...additionalData,
      isFirstLogin: false
    });
    res.status(200).json({ message: 'Registro finalizado com sucesso', user: updatedUser });
  }
}

export default new AuthController()