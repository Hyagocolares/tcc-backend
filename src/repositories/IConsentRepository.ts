import { Consent } from "../entities/consent/ConsentEntity";

export interface IConsentRepository {
  createConsent(consent: Partial<Consent>): Promise<Consent>;
  getConsentById(id: number): Promise<Consent | null>;
  getAllConsents(): Promise<Consent[]>;
  updateConsent(id: number, consent: Partial<Consent>): Promise<Consent>;
  deleteConsent(id: number): Promise<void>;
  searchConsents(criteria: Partial<Consent>): Promise<Consent[]>;
}