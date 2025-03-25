// src/entities/request/TeacherConsentDisciplineEntity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { Teacher } from "../user/UserEntity"
import { Discipline } from "../course/DisciplineEntity"
import { TeacherConsent } from "../consent/ConsentEntity"
import { Request } from "./RequestEntity"

@Entity("teacher_consent_disciplines")
export default class TeacherConsentDiscipline {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Teacher, teacher => teacher.teacherConsents)
  teacher: Teacher

  @ManyToOne(() => Discipline)
  discipline: Discipline

  @Column({ type: "date" })
  date: Date

  @Column({ name: "time_in", type: "time" })
  timeIn: string

  @Column({ name: "time_out", type: "time" })
  timeOut: string

  @OneToOne(() => TeacherConsent)
  @JoinColumn()
  consent: TeacherConsent

  @ManyToOne(() => Request, request => request.teacherConsents, { onDelete: 'CASCADE' })
  request: Request

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}
