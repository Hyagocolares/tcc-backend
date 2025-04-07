// src/repositories/implementations/UserRepository.ts
import { Repository } from 'typeorm';
import AppDataSource from '../../config/ormconfig';
import { IUserRepository } from "../IUserRepository";
import { User } from "../../entities/user/UserEntity";

export default class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async createUser(user: Partial<User>): Promise<User> {
        const newUser = this.repository.create(user);
        return this.repository.save(newUser);
    }

    async getUserById(id: number): Promise<User | null> {
        return this.repository.findOne({
            where: { id },
            relations: [
                'requests',
                'requests.subjects.subject',
                'requests.subjects.subject.courses',
                'disciplines',
                'courses',
                'teacherConsents',
                'coordinatorConsents',
                'directorConsents'
            ],
            select: [
                'id',
                'name',
                'email',
                'password',
                'registration',
                'category',
                'academicBackground',  // <-- Adicionado explicitamente
                'photoUrl',
                'isFirstLogin',
                'createdAt',
                'updatedAt'
            ]
        })
    }

    async getAllUsers(): Promise<User[]> {
        return this.repository.find({ relations: ['requests'] });
    }

    async updateUser(id: number, user: Partial<User>): Promise<User> {
        const { requests, statusRequests, ...updateData } = user;
        await this.repository.update(id, updateData);
        return this.repository.findOne({ where: { id } }) as Promise<User>;
    }

    async deleteUser(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email });
    }

    async searchUsers(criteria: Partial<User>): Promise<User[]> {
        return this.repository.find({ where: criteria })
    }

    async getTeachers(): Promise<User[]> {
        return this.repository.find({
            where: { category: 'Teacher' },
            relations: [
                'disciplines'
            ]
        });
    }

    async getCoordinator(): Promise<User[]> {
        return this.repository.find({
            where: { category: 'Coordinator' },
            relations: [
                'disciplines'
            ]
        });
    }
}
