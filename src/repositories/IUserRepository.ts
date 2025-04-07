// src/repositories/IUserRepository.ts
import { User } from "../entities/user/UserEntity";

export interface IUserRepository {
  createUser(user: Partial<User>): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, user: Partial<User>): Promise<User>;
  deleteUser(id: number): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  searchUsers(criteria: Partial<User>): Promise<User[]>;
  getTeachers(): Promise<User[]>;
}
