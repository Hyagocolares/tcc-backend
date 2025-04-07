// src/controllers/TeacherConsentDisciplineController.ts
import { Request, Response } from "express";
import { exceptionRouter } from "../utils/utilsRequest";
import TeacherConsentDisciplineRepository from "../repositories/implementations/TeacherConsentDisciplineRepository";
import UserRepository from "src/repositories/implementations/UserRepository";
import RequestRepository from "src/repositories/implementations/RequestRepository";

class TeacherConsentDisciplineController {
  async createConsent(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Dados recebidos para criação:", JSON.stringify(req.body, null, 2));
      const repository = new TeacherConsentDisciplineRepository();
      const consentData = req.body;

      const newConsent = await repository.createConsent(consentData);
      console.log("✅ [Controller] Consentimento criado com sucesso:", JSON.stringify(newConsent, null, 2));

      res.status(201).json({ message: "Consent created", consent: newConsent });
      return
    } catch (error) {
      console.error("❌ [Controller] Erro ao criar consentimento:", error);
      return exceptionRouter(req, res, error);
    }
  }

  async getConsentById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      console.log(`📥 [Controller] Solicitando consentimento com ID: ${id}`);
      const repository = new TeacherConsentDisciplineRepository();

      const consent = await repository.getConsentById(Number(id));
      if (!consent) {
        console.warn(`⚠️ [Controller] Consentimento com ID ${id} não encontrado.`);
        res.status(404).json({ message: "Consent not found" });
        return;
      }

      console.log("✅ [Controller] Consentimento encontrado:", JSON.stringify(consent, null, 2));
      res.status(200).json({ consent });
      return
    } catch (error) {
      console.error(`❌ [Controller] Erro ao buscar consentimento com ID ${req.params.id}:`, error);
      return exceptionRouter(req, res, error);
    }
  }

  async getAllConsents(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Solicitando todos os consentimentos");
      const repository = new TeacherConsentDisciplineRepository();
      const consents = await repository.getAllConsents();

      console.log("✅ [Controller] Consentimentos retornados:", JSON.stringify(consents, null, 2));
      res.status(200).json({ consents });
      return
    } catch (error) {
      console.error("❌ [Controller] Erro ao buscar todos os consentimentos:", error);
      return exceptionRouter(req, res, error);
    }
  }

  async updateConsent(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Dados recebidos para atualização:", JSON.stringify(req.body, null, 2));
      const repository = new TeacherConsentDisciplineRepository();
      const { id } = req.params;
      const consentData = req.body;

      // Verifica se o usuário é o professor associado ao consentimento
      const consent = await repository.getConsentById(Number(id));
      if (!consent || consent.teacher.id !== req.body.teacher.id) {
        res.status(403).json({ message: 'Access denied' });
        return;
      }

      const updatedConsent = await repository.updateConsent(Number(id), consentData);
      console.log("✅ [Controller] Consentimento atualizado com sucesso:", JSON.stringify(updatedConsent, null, 2));

      res.status(200).json({ message: "Consent updated", consent: updatedConsent });
      return
    } catch (error) {
      console.error("❌ [Controller] Erro ao atualizar consentimento:", error);
      return exceptionRouter(req, res, error);
    }
  }

  async deleteConsent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      console.log(`📥 [Controller] Solicitando deleção do consentimento com ID: ${id}`);
      const repository = new TeacherConsentDisciplineRepository();

      await repository.deleteConsent(Number(id));
      console.log("✅ [Controller] Consentimento deletado com sucesso.");

      res.status(200).json({ message: "Consent deleted" });
      return
    } catch (error) {
      console.error(`❌ [Controller] Erro ao deletar consentimento com ID ${req.params.id}:`, error);
      return exceptionRouter(req, res, error);
    }
  }

  async getConsentsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const repository = new TeacherConsentDisciplineRepository();
      const consents = await repository.getConsentsByUserId(Number(id));
      res.status(200).json({ consents });
      return
    } catch (error) {
      console.error("❌ [Controller] Erro ao buscar consentimentos por ID do usuário:", error);
      return exceptionRouter(req, res, error);
    }
  }

  async getRequestsByTeacherId(req: Request, res: Response): Promise<void> {
    try {
      const { teacherId } = req.params;
      console.log(`📥 [Controller] Buscando requests do professor ID: ${teacherId}`);
  
      const repository = new TeacherConsentDisciplineRepository();
      const requests = await repository.getRequestsByTeacherId(Number(teacherId));
  
      if (!requests.length) {
        console.warn(`⚠️ [Controller] Nenhuma request encontrada para o professor ID ${teacherId}`);
        res.status(404).json({ message: "No requests found for this teacher" });
        return
      }
  
      console.log("✅ [Controller] Requests encontradas:", JSON.stringify(requests, null, 2));
      res.status(200).json({ requests });
      return
    } catch (error) {
      console.error("❌ [Controller] Erro ao buscar requests por professor:", error);
      return exceptionRouter(req, res, error);
    }
  }
  
  async getAllRequestsWithTeachers(req: Request, res: Response): Promise<void> {
    try {
      console.log("📥 [Controller] Buscando todas as requests com professores");
  
      const repository = new TeacherConsentDisciplineRepository();
      const requests = await repository.getAllRequestsWithTeachers();
  
      if (!requests.length) {
        console.warn(`⚠️ [Controller] Nenhuma request encontrada com professores`);
        res.status(404).json({ message: "No requests found with teachers" });
        return
      }
  
      console.log("✅ [Controller] Todas as requests com professores:", JSON.stringify(requests, null, 2));
      res.status(200).json({ requests });
      return
    } catch (error) {
      console.error("❌ [Controller] Erro ao buscar todas as requests com professores:", error);
      return exceptionRouter(req, res, error);
    }
  }  
}

export default new TeacherConsentDisciplineController();
