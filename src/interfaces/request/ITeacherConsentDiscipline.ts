import { ITeacherConsent } from "../consent/IConsent";
import { IDiscipline } from "../course/IDiscipline";
import { IUser } from "../user/IUser";
import { IRequest } from "./IRequest";

export interface ITeacherConsentDiscipline {
    id: number;
    teacher: IUser;
    discipline: IDiscipline;
    date: string;
    timeIn: string;
    timeOut: string;
    signature: ITeacherConsent;
    request: IRequest;
    createdAt: Date;
    updatedAt: Date;
  }