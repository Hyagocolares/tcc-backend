// src/entities/request/SubjectEntity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm"
import { Request } from "./RequestEntity"
import { Discipline } from "../course/DisciplineEntity"

@Entity("subjects")
export default class Subject {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Discipline, { eager: true })
  @JoinColumn({ name: "subject_id" })
  subject: Discipline
  
  @Column({ name: "class_group", length: 50 })
  classGroup: string

  @Column({ name: "student_count", type: "int" })
  studentCount: number

  @Column({ type: "int" })
  workload: number

  @Column({ name: "file_data", type: "text" })
  fileData?: string

  @Column({ name: "file_name", length: 255 })
  fileName?: string

  @Column({ name: "file_type", length: 50 })
  fileType?: string

  @ManyToOne(() => Request, (request) => request.subjects, { onDelete: 'CASCADE' })
  request: Request

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}
