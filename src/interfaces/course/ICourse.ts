// src/interfaces/course/ICourse.ts
import { ICoordinator, ITeacher } from "../user/IUser";
import { IDiscipline } from "./IDiscipline";

export interface ICourse {
    id: number;
    name: string;
    disciplines: IDiscipline[];
    coordinator: ICoordinator;
    teacher: ITeacher;
    createdAt: Date;
    updatedAt: Date;
  }