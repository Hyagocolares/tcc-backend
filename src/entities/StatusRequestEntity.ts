// src/entities/StatusRequestEntity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { RequestStatusEnum } from './enums/RequestStatusEnum'
import { User } from './user/UserEntity'
import { Request } from './request/RequestEntity'

@Entity('status_requests')
export default class StatusRequest {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Request, request => request.statusRequests, { nullable: false })
  request: Request

  @ManyToOne(() => User, user => user.statusRequests, { nullable: false })
  user: User

  @Column()
  name: string

  @Column({ type: 'text', nullable: true })
  comment?: string

  @Column({
    type: 'enum',
    enum: RequestStatusEnum,
    default: RequestStatusEnum.DRAFT,
  })
  status: RequestStatusEnum

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
