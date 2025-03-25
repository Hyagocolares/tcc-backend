import { IUser } from "../user/IUser";

export interface IConsent {
    id: number;
    accepted: boolean;
    signature: string;
    opinion?: string;
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ICoordinatorConsent extends IConsent {}
  export interface IDirectorConsent extends IConsent {}
  export interface ITeacherConsent extends IConsent {}