// src/repositories/implementations/ConsentRepository.ts
import { Repository } from "typeorm";
import AppDataSource from '../../config/ormconfig';
import { IConsentRepository } from "../IConsentRepository";
import { Consent, DirectorConsent } from "../../entities/consent/ConsentEntity";
import { Request } from "../../entities/request/RequestEntity";
import { RequestStatusEnum } from "../../entities/enums/RequestStatusEnum";
import RequestRepository from "./RequestRepository";

export default class ConsentRepository implements IConsentRepository {
  private repository: Repository<Consent>;
  private directorConsentRepository: Repository<DirectorConsent>;
  private requestRepository: Repository<Request>;

  constructor() {
    this.repository = AppDataSource.getRepository(Consent);
    this.directorConsentRepository = AppDataSource.getRepository(DirectorConsent);
    this.requestRepository = AppDataSource.getRepository(Request);
  }

  async createConsent(consent: Partial<Consent>): Promise<Consent> {
    const newConsent = this.repository.create(consent);
    return this.repository.save(newConsent);
  }

  async createDirectorConsent(consent: Partial<DirectorConsent>, requestId: number): Promise<DirectorConsent> {
    console.log("📥 [Repository] Criando consentimento de diretor para request:", requestId);
    console.log("📥 [Repository] Dados do consentimento:", JSON.stringify(consent, null, 2));

    try {
      // Verificar se já existe um consentimento para esta solicitação
      const existingConsent = await this.getDirectorConsentByRequestId(requestId);
      if (existingConsent) {
        console.log("⚠️ [Repository] Já existe um consentimento de diretor para esta solicitação:", existingConsent.id);
        throw new Error('Já existe um consentimento de diretor para esta solicitação');
      }

      // Buscar a request
      const requestRepository = new RequestRepository()
      const request = await requestRepository.getRequestById(requestId);

      if (!request) {
        console.error("❌ [Repository] Request não encontrada:", requestId);
        throw new Error('Request não encontrada');
      }

      console.log("✅ [Repository] Request encontrada:", JSON.stringify({
        id: request.id,
        status: request.status
      }, null, 2));

      // Verificar se o userDirector foi fornecido
      if (!consent.userDirector) {
        console.error("❌ [Repository] Diretor não fornecido para o consentimento");
        throw new Error('Diretor não fornecido para o consentimento');
      }

      console.log("✅ [Repository] Diretor fornecido:", JSON.stringify({
        id: consent.userDirector.id,
        name: consent.userDirector.name,
        email: consent.userDirector.email
      }, null, 2));

      // Criar o consentimento do diretor
      const newDirectorConsent = this.directorConsentRepository.create({
        ...consent,
        accepted: consent.accepted ?? false,
        opinion: consent.opinion || '',
        userDirector: consent.userDirector,
        request: request,
        requestId: requestId
      });

      console.log("📤 [Repository] Dados para criação do consentimento:", JSON.stringify({
        accepted: newDirectorConsent.accepted,
        opinion: newDirectorConsent.opinion,
        requestId: newDirectorConsent.requestId,
        userDirectorId: newDirectorConsent.userDirector?.id
      }, null, 2));

      // Salvar o consentimento
      const savedDirectorConsent = await this.directorConsentRepository.save(newDirectorConsent);

      console.log("✅ [Repository] Consentimento salvo com sucesso:", JSON.stringify({
        id: savedDirectorConsent.id,
        accepted: savedDirectorConsent.accepted,
        opinion: savedDirectorConsent.opinion,
        createdAt: savedDirectorConsent.createdAt,
        updatedAt: savedDirectorConsent.updatedAt,
        requestId: savedDirectorConsent.requestId
      }, null, 2));

      // Atualizar o status da request para APPROVED ou REJECTED
      try {
        request.status = consent.accepted ? RequestStatusEnum.APPROVED : RequestStatusEnum.REJECTED;
        await this.requestRepository.save(request);
        console.log("✅ [Repository] Status da request atualizado:", request.status);
      } catch (error) {
        console.error("❌ [Repository] Erro ao atualizar status da request:", error);
        // Não lançar erro aqui, apenas logar
      }

      return savedDirectorConsent;
    } catch (error) {
      console.error("❌ [Repository] Erro ao criar consentimento de diretor:", error);
      throw error;
    }
  }

  async getConsentById(id: number): Promise<Consent | null> {
    return this.repository.findOne({ where: { id } });
  }

  async getAllConsents(): Promise<Consent[]> {
    return this.repository.find();
  }

  async updateConsent(id: number, consent: Partial<Consent>): Promise<Consent> {
    await this.repository.update(id, consent);
    const updated = await this.repository.findOneBy({ id });
    if (!updated) throw new Error('Consent not found');
    return updated;
  }

  async deleteConsent(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async searchConsents(criteria: Partial<Consent>): Promise<Consent[]> {
    return this.repository.find({ where: criteria });
  }

  async getDirectorConsentByRequestId(requestId: number): Promise<DirectorConsent | null> {
    console.log("🔍 [Repository] Buscando consentimento de diretor para request:", requestId);

    const directorConsent = await this.directorConsentRepository.findOne({
      where: { requestId: requestId },
      relations: ['request', 'userDirector']
    });

    if (directorConsent) {
      console.log("✅ [Repository] Consentimento de diretor encontrado:", JSON.stringify({
        id: directorConsent.id,
        accepted: directorConsent.accepted,
        opinion: directorConsent.opinion,
        requestId: directorConsent.requestId,
        directorId: directorConsent.userDirector?.id
      }, null, 2));
    } else {
      console.log("ℹ️ [Repository] Nenhum consentimento de diretor encontrado para a request:", requestId);
    }

    return directorConsent;
  }

  async getDirectorConsentById(id: number): Promise<DirectorConsent | null> {
    console.log("🔍 [Repository] Buscando consentimento de diretor por ID:", id);

    const directorConsent = await this.directorConsentRepository.findOne({
      where: { id: id },
      relations: ['request', 'userDirector']
    });

    if (directorConsent) {
      console.log("✅ [Repository] Consentimento de diretor encontrado:", JSON.stringify({
        id: directorConsent.id,
        accepted: directorConsent.accepted,
        opinion: directorConsent.opinion,
        requestId: directorConsent.requestId,
        directorId: directorConsent.userDirector?.id
      }, null, 2));
    } else {
      console.log("ℹ️ [Repository] Nenhum consentimento de diretor encontrado com ID:", id);
    }

    return directorConsent;
  }

  async getDirectorConsents(): Promise<DirectorConsent[]> {
    console.log("🔍 [Repository] Buscando todos os consentimentos de diretor");

    const directorConsents = await this.directorConsentRepository.find({
      relations: ['request', 'userDirector']
    });

    console.log(`✅ [Repository] Encontrados ${directorConsents.length} consentimentos de diretor`);

    directorConsents.forEach((consent, index) => {
      console.log(`📋 [Repository] Consentimento ${index + 1}:`, JSON.stringify({
        id: consent.id,
        accepted: consent.accepted,
        opinion: consent.opinion,
        requestId: consent.requestId,
        directorId: consent.userDirector?.id
      }, null, 2));
    });

    return directorConsents;
  }

  async getDirectorConsentsByDirectorId(directorId: number): Promise<DirectorConsent[]> {
    console.log("🔍 [Repository] Buscando consentimentos de diretor por ID do diretor:", directorId);

    const directorConsents = await this.directorConsentRepository.find({
      where: { userDirector: { id: directorId } },
      relations: ['request', 'userDirector']
    });

    console.log(`✅ [Repository] Encontrados ${directorConsents.length} consentimentos para o diretor ${directorId}`);

    directorConsents.forEach((consent, index) => {
      console.log(`📋 [Repository] Consentimento ${index + 1}:`, JSON.stringify({
        id: consent.id,
        accepted: consent.accepted,
        opinion: consent.opinion,
        requestId: consent.requestId,
        directorId: consent.userDirector?.id
      }, null, 2));
    });

    return directorConsents;
  }
}