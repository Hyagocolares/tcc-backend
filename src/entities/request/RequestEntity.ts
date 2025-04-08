// src/entities/request/RequestEntity.ts
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from "typeorm"
import {
  User
} from "../user/UserEntity"
import { RequestStatusEnum } from "../enums/RequestStatusEnum"
import Subject from "./SubjectEntity"
import ItineraryItem from "./ItineraryItemEntity"
import Resource from "./ResourceEntity"
import Location from "./LocationEntity"
import {
  CoordinatorConsent,
  DirectorConsent
} from "../consent/ConsentEntity"
import TeacherConsentDiscipline from "./TeacherConsentDisciplineEntity"
import StatusRequest from "../StatusRequestEntity"

@Entity("requests")
export class Request {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.requests, { nullable: false })
  user: User

  @ManyToMany(() => User)
  @JoinTable({ name: "request_companions" })
  companions?: User[]

  @Column({
    type: "enum",
    enum: RequestStatusEnum,
    default: RequestStatusEnum.DRAFT
  })
  @Index()
  status: RequestStatusEnum

  @OneToMany(() => StatusRequest, statusRequest => statusRequest.request)
  statusRequests?: StatusRequest[]

  @OneToMany(() => Subject, subject => subject.request, { eager: true, cascade: true })
  subjects?: Subject[]

  @OneToMany(() => Location, location => location.request, { eager: true, cascade: true })
  locations?: Location[]

  @OneToMany(() => ItineraryItem, itinerary => itinerary.request, { eager: true, cascade: true })
  itinerary?: ItineraryItem[]

  @OneToMany(() => Resource, resource => resource.request, { eager: true, cascade: true })
  resources?: Resource[]

  @OneToMany(() => TeacherConsentDiscipline, teacherConsentDiscipline => teacherConsentDiscipline.request, { eager: true, cascade: true })
  consent?: TeacherConsentDiscipline[]

  @OneToMany(() => CoordinatorConsent, consent => consent.request, { eager: true })
  coordinatorConsents?: CoordinatorConsent[]

  @OneToMany(() => DirectorConsent, consent => consent.request, { eager: true, cascade: true })
  directorConsents?: DirectorConsent[]

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
}
