// src/interfaces/user/IUser.ts
export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  registration?: string;
  category?: 'Teacher' | 'Coordinator' | 'Director';
  photoUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITeacher extends IUser {
  academicBackground?: string;
  courses?: number[]; // IDs dos cursos
  disciplines?: number[]; // IDs das disciplinas
  teacherRequests?: number[]; // IDs dos pedidos
  teacherConsents?: number[]; // IDs dos consentimentos
}

export interface ICoordinator extends IUser {
  supervision?: string[];
  courses?: number[]; // IDs dos cursos
  disciplines?: number[]; // IDs das disciplinas
  coordinatorRequests?: number[]; // IDs dos pedidos
  coordinatorConsents?: number[]; // IDs dos consentimentos
}

export interface IDirector extends IUser {
  directorConsents?: number[]; // IDs dos consentimentos
}
