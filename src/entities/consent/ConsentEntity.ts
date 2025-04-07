// src/entities/consent/ConsentEntity.ts
import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn
} from "typeorm";
import { Coordinator, Director, Teacher } from "../user/UserEntity";
import { Request } from "../request/RequestEntity";
import TeacherConsentDiscipline from "../request/TeacherConsentDisciplineEntity";

@Entity('consents')
@TableInheritance({ column: { type: 'varchar', name: 'consent_type' } })
export class Consent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accepted: boolean;

  @Column({ nullable: true })
  opinion?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

@ChildEntity('teacher_consent')
export class TeacherConsent extends Consent {

  @ManyToOne(() => Teacher, teacher => teacher.teacherConsents)
  userTeacher: Teacher;

  @OneToMany(() => TeacherConsentDiscipline, teacherConsentDiscipline => teacherConsentDiscipline.teacher.teacherConsents)
  disciplineConsents: TeacherConsentDiscipline[];

  @ManyToOne(() => Request, request => request.consent)
  request: Request;
}

@ChildEntity('coordinator_consent')
export class CoordinatorConsent extends Consent {

  @ManyToOne(() => Coordinator, coordinator => coordinator.coordinatorConsents)
  userCoordinator: Coordinator;

  @ManyToOne(() => Request, request => request.coordinatorConsents)
  request: Request;
}

@ChildEntity('director_consent')
export class DirectorConsent extends Consent {
  @ManyToOne(() => Director, director => director.directorConsents)
  userDirector: Director;

  @ManyToOne(() => Request, request => request.directorConsents)
  request: Request;
}
