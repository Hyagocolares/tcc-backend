import { IRequest } from "./IRequest";

export interface ILocation {
    id: number;
    location: string;
    municipality: string;
    periodStart: string;
    periodEnd: string;
    totalDistanceKm: number;
    request: IRequest;
  }