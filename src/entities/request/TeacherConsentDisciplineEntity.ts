// src/entities/request/TeacherConsentDisciplineEntity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { Teacher } from "../user/UserEntity"
import { Discipline } from "../course/DisciplineEntity"
// import { TeacherConsent } from "../consent/ConsentEntity"
import { Request } from "./RequestEntity"

@Entity("teacher_consent_disciplines")
export default class TeacherConsentDiscipline {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Teacher, teacher => teacher.teacherConsents)
  teacher: Teacher

  @ManyToOne(() => Discipline)
  discipline: Discipline

  @Column({ name: "date", type: "date" })
  date: string

  @Column({ name: "timeIn", type: "time" })
  timeIn: string

  @Column({ name: "timeOut", type: "time" })
  timeOut: string

  @ManyToOne(() => Request, request => request.consent, { onDelete: 'CASCADE' })
  request: Request

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}
