// src/routes/teacherConsentDisciplineRoutes.ts
import { Router } from "express";
import TeacherConsentDisciplineController from "../controllers/TeacherConsentDisciplineController";
import { authenticate } from "../middlewares/authMiddleware";

const teacherConsentDisciplineRoutes = Router();

teacherConsentDisciplineRoutes.use(authenticate);

teacherConsentDisciplineRoutes.get("/requests/teacher/:teacherId", TeacherConsentDisciplineController.getRequestsByTeacherId);
teacherConsentDisciplineRoutes.get("/requests/user/:userId", TeacherConsentDisciplineController.getConsentsByUserId);
teacherConsentDisciplineRoutes.get("/requests/all-with-teachers", TeacherConsentDisciplineController.getAllRequestsWithTeachers);

teacherConsentDisciplineRoutes.get("/", TeacherConsentDisciplineController.getAllConsents);
teacherConsentDisciplineRoutes.post("/", TeacherConsentDisciplineController.createConsent);
teacherConsentDisciplineRoutes.get("/:id", TeacherConsentDisciplineController.getConsentById);
teacherConsentDisciplineRoutes.put("/:id", TeacherConsentDisciplineController.updateConsent);
teacherConsentDisciplineRoutes.delete("/:id", TeacherConsentDisciplineController.deleteConsent);

export default teacherConsentDisciplineRoutes;
