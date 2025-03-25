import { IRequest } from "./IRequest";

export interface ISubject {
    id: number;
    subject: string;
    classGroup: string;
    numberOfStudents: number;
    workload: number;
    fileBase64: string;
    fileName: string;
    fileType: string;
    request: IRequest;
  }