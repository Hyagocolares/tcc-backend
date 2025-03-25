// src/entities/course/DisciplineEntity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { Course } from "./CourseEntity"
import {
  Coordinator,
  Teacher
} from "../user/UserEntity"

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
  @JoinTable({
    name: 'discipline_teachers',
    joinColumn: { name: 'discipline_id' },
    inverseJoinColumn: { name: 'teacher_id' }
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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}