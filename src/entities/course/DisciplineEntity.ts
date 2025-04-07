// src/entities/course/DisciplineEntity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { Course } from "./CourseEntity"
import {
  Coordinator,
  Teacher
} from "../user/UserEntity"
import TeacherConsentDiscipline from "../request/TeacherConsentDisciplineEntity"

@Entity('disciplines')
export class Discipline {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  code: string

  @Column()
  workload: number

  @ManyToMany(() => Course, course => course.disciplines)
  courses: Course[];

  @ManyToMany(() => Teacher, teacher => teacher.disciplines, {
    eager: true,
    onDelete: 'CASCADE'
  })
  teachers: Teacher[];

  @ManyToMany(() => Coordinator, coordinator => coordinator.disciplines, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'discipline_coordinators',
    joinColumn: { name: 'discipline_id' },
    inverseJoinColumn: { name: 'coordinator_id' }
  })
  coordinators: Coordinator[];

  @OneToMany(() => TeacherConsentDiscipline, teacherConsentDiscipline => teacherConsentDiscipline.discipline)
  consents: TeacherConsentDiscipline[];

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}