// src/controllers/PasswordController.ts
import { Request, Response } from 'express';
import UserRepository from '../repositories/implementations/UserRepository';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generateResetToken } from '../middlewares/authMiddleware';
import { sendResetPasswordEmail } from '../services/emailService';
import { exceptionRouter } from '../utils/utilsRequest';

class PasswordController {
    async requestPasswordReset(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            const userRepository = new UserRepository();
            const user = await userRepository.findByEmail(email);
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }
            const token = generateResetToken(user.id);
            // Enviar e-mail com o token e instruções para resetar a senha
            await sendResetPasswordEmail(user.email, token);
            res.status(200).json({ message: 'E-mail de recuperação enviado' });
        } catch (error) {
            console.error(`❌ Erro de recuperação: `, error);
            return exceptionRouter(req, res, error)
        }
    }

    async resetPassword(req: Request, res: Response): Promise<void> {
        const { token, newPassword } = req.body;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
            const userRepository = new UserRepository();
            const user = await userRepository.getUserById(decoded.id);
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }
            // Gerar novo hash para a senha
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            await userRepository.updateUser(user.id, { password: hashedPassword });
            res.status(200).json({ message: 'Senha atualizada com sucesso' });
        } catch (error) {
            console.error(`❌ Erro de atualizacao de senha: `, error);
            return exceptionRouter(req, res, error)
        }
    }
}

export default new PasswordController();
