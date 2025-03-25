import { IRequest } from "./IRequest";

export interface IResource {
    id: number;
    resource: string;
    quantity: number;
    quantityDay: number;
    request: IRequest;
  }