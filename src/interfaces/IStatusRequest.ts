import { RequestStatusEnum } from "./enums/RequestStatusEnum";

export interface IStatusRequest {
    id: number;
    status: RequestStatusEnum;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
  }