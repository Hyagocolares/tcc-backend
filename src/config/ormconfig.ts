// src/config/ormconfig.ts
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import environment from './environment'
import {
  User,
  Teacher,
  Coordinator,
  Director,
} from '../entities/user/UserEntity'
import { Course } from '../entities/course/CourseEntity'
import { Request } from '../entities/request/RequestEntity'
import { Discipline } from '../entities/course/DisciplineEntity'
import { 
  Consent, 
  TeacherConsent, 
  CoordinatorConsent, 
  DirectorConsent 
} from '../entities/consent/ConsentEntity'
import Subject from '../entities/request/SubjectEntity'
import StatusRequest from '../entities/StatusRequestEntity'
import ItineraryItem from '../entities/request/ItineraryItemEntity'
import Resource from '../entities/request/ResourceEntity'
import Location from '../entities/request/LocationEntity'
import TeacherConsentDiscipline from '../entities/request/TeacherConsentDisciplineEntity'

const mode = environment.server.mode.trim()
console.log('[debug] mode:', mode)
const dirName = ['production', 'debug'].includes(mode) ? 'dist' : 'src'
console.log('[debug] dirName:', dirName)
const database = environment.database

export default new DataSource({
  type: 'postgres',
  host: database.host,
  port: Number(database.port),
  schema: database.schema,
  username: database.user,
  password: database.password,
  database: database.name,
  synchronize: database.synchronize,
  logging: database.queryLogging,
  entities: [
    User,
    Teacher,
    Coordinator,
    Director,
    Course,
    Discipline,
    Request,
    StatusRequest,
    Consent,
    Subject,
    ItineraryItem,
    Resource,
    Location,
    TeacherConsentDiscipline,
    TeacherConsent,
    CoordinatorConsent,
    DirectorConsent
  ],
  migrations: [
    `${dirName}/migrations/**/*.{ts,js}`
  ],
  subscribers: [
    `${dirName}/subscriber/**/*.{ts,js}`
  ],
})