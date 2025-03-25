import { ICoordinatorConsent, IDirectorConsent } from "../consent/IConsent";
import { RequestStatusEnum } from "../enums/RequestStatusEnum";
import { IUser } from "../user/IUser";
import { IItineraryItem } from "./IItineraryItem";
import { ILocation } from "./ILocation";
import { IResource } from "./IResource";
import { ISubject } from "./ISubject";
import { ITeacherConsentDiscipline } from "./ITeacherConsentDiscipline";

export interface IRequest {
    id: number;
    user: IUser;
    companions: IUser[];
    status: RequestStatusEnum;
    subjects: ISubject[];
    locations: ILocation[];
    itinerary: IItineraryItem[];
    resources: IResource[];
    consents: ITeacherConsentDiscipline[];
    coordinatorConsents: ICoordinatorConsent[];
    directorConsents: IDirectorConsent[];
    createdAt: Date;
    updatedAt: Date;
  }