// src/entities/user/UserEntity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  TableInheritance,
  ChildEntity,
  ManyToMany,
  Index
} from 'typeorm'
import { CoordinatorConsent, DirectorConsent, TeacherConsent } from '../consent/ConsentEntity'
import { Request } from '../request/RequestEntity'
import { Course } from '../course/CourseEntity'
import { Discipline } from '../course/DisciplineEntity'
import StatusRequest from '../StatusRequestEntity'

@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'user_type' } })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  @Index()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  registration?: string

  @Column({
    type: 'enum',
    enum: ['Teacher', 'Coordinator', 'Director'],
    nullable: true
  })
  category?: 'Teacher' | 'Coordinator' | 'Director'

  @Column({ nullable: true })
  photoUrl?: string

  @OneToMany(() => Request, request => request.user)
  requests: Request[]

  @OneToMany(() => StatusRequest, statusRequest => statusRequest.user)
  statusRequests: StatusRequest[];

  @Column({ default: true })
  isFirstLogin: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}

@ChildEntity('Teacher')
export class Teacher extends User {
  @Column()
  academicBackground: string

  @ManyToMany(() => Course, course => course.teachers)
  courses: Course[]

  @ManyToMany(() => Discipline, discipline => discipline.teachers)
  disciplines: Discipline[]

  @OneToMany(() => Request, request => request.teacher)
  teacherRequests: Request[]

  @OneToMany(() => TeacherConsent, teacherConsent => teacherConsent.userTeacher)
  teacherConsents: TeacherConsent[]
}

@ChildEntity('Coordinator')
export class Coordinator extends User {
  @Column("simple-array", { nullable: true })
  supervision: string[]

  @ManyToMany(() => Course, course => course.coordinators)
  courses: Course[]

  @ManyToMany(() => Discipline, discipline => discipline.coordinators)
  disciplines: Discipline[]

  @OneToMany(() => Request, request => request.coordinator)
  coordinatorRequests: Request[]

  @OneToMany(() => CoordinatorConsent, coordinatorConsent => coordinatorConsent.userCoordinator)
  coordinatorConsents: CoordinatorConsent[]
}

@ChildEntity('Director')
export class Director extends User {
  @OneToMany(() => DirectorConsent, directorConsent => directorConsent.userDirector)
  directorConsents: DirectorConsent[]
}