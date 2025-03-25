// src/entities/course/CourseEntity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import {
  Coordinator,
  Teacher
} from "../user/UserEntity"
import { Discipline } from "./DisciplineEntity"

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Coordinator, coordinator => coordinator.courses, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'course_coordinators',
    joinColumn: { name: 'course_id' },
    inverseJoinColumn: { name: 'coordinator_id' }
  })
  coordinators: Coordinator[];

  @ManyToMany(() => Teacher, teacher => teacher.courses, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'course_teachers',
    joinColumn: { name: 'course_id' },
    inverseJoinColumn: { name: 'teacher_id' }
  })
  teachers: Teacher[];

  @ManyToMany(() => Discipline, discipline => discipline.courses)
  @JoinTable({
    name: 'course_disciplines',
    joinColumn: { name: 'course_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'discipline_id', referencedColumnName: 'id' }
  })
  disciplines: Discipline[];

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}