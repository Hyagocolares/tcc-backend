import { ITeacher } from "../user/IUser";
import { ICourse } from "./ICourse";

export interface IDiscipline {
    id: number;
    name: string;
    code: string;
    workload: number;
    courses: ICourse[];
    teachers: ITeacher[];
    createdAt: Date;
    updatedAt: Date;
  }